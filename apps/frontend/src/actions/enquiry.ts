"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import { after } from "next/server";
import { regionOrder, regions, travellerTypes } from "@/content/site";
import { enquiryDays, enquiryInterests, enquiryMonths, type EnquiryVariant } from "@/lib/enquiry";
import { enquiryConfirmationEmail } from "@/lib/emails/enquiryConfirmation";
import { getSiteSettings, getTrips } from "@/lib/content";
import { getCms } from "@/lib/payload";
import type { Enquiry } from "@/payload-types";

export type EnquiryField =
  | "name"
  | "phone"
  | "email"
  | "organisation"
  | "trip"
  | "travellerType"
  | "groupSize"
  | "region"
  | "month"
  | "days"
  | "fromCity"
  | "message"
  | "consent";

type EnquiryValues = Partial<Record<Exclude<EnquiryField, "consent">, string>> & { interests?: string[] };

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back on error because React resets the form after an action. */
  values?: EnquiryValues;
}

const INDIAN_MOBILE = /^(?:\+?91|0)?([6-9]\d{9})$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regionLabels = regionOrder.map((r) => regions[r].label);
const groupTypes = travellerTypes.slice(1) as readonly string[];

/** Letters in any script (incl. Gujarati/Hindi marks), spaces, dots, apostrophes and hyphens; no links. */
const PERSON_NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;

const LIMITS = {
  /** Enquiries one visitor can send in the window before being asked to wait. */
  perVisitor: 5,
  visitorWindowMs: 10 * 60 * 1000,
  /** Confirmation emails one address can receive per day; further enquiries are saved without a mail. */
  mailsPerAddress: 3,
  addressWindowMs: 24 * 60 * 60 * 1000,
};

/**
 * Identifies the visitor for rate limiting without storing their IP: a keyed hash of the address
 * the host's proxy reports (on Vercel the first x-forwarded-for entry is the real client).
 */
async function visitorKey() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");
  return ip ? createHmac("sha256", process.env.PAYLOAD_SECRET ?? "").update(ip).digest("hex").slice(0, 32) : undefined;
}

const since = (ms: number) => new Date(Date.now() - ms).toISOString();

const text = (fd: FormData, key: string, max = 200) =>
  String(fd.get(key) ?? "").trim().replace(/\s+/g, " ").slice(0, max);
const oneOf = (value: string, allowed: readonly string[]) => !value || allowed.includes(value);

export async function submitEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  if (text(fd, "website")) return { status: "success" };

  const variant: EnquiryVariant = (["quick", "trip", "group"] as const).find((v) => v === fd.get("variant")) ?? "quick";
  const values = {
    name: text(fd, "name", 80),
    phone: text(fd, "phone", 20),
    email: text(fd, "email", 120).toLowerCase(),
    organisation: text(fd, "organisation", 120),
    trip: text(fd, "trip"),
    travellerType: text(fd, "travellerType"),
    groupSize: text(fd, "groupSize", 6),
    region: text(fd, "region"),
    month: text(fd, "month"),
    days: text(fd, "days"),
    fromCity: text(fd, "fromCity", 80),
    message: String(fd.get("message") ?? "").trim().slice(0, 1000),
    interests: fd.getAll("interests").map(String).filter((i) => enquiryInterests.includes(i)),
  } satisfies EnquiryValues;

  const mobile = values.phone.replace(/[\s()-]/g, "").match(INDIAN_MOBILE)?.[1];
  const trip = values.trip ? (await getTrips()).find((t) => t.slug === values.trip) : undefined;
  const size = values.groupSize ? Number(values.groupSize) : undefined;

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Please enter your name.";
  else if (!PERSON_NAME.test(values.name)) fieldErrors.name = "Please use letters only in your name.";
  if (!mobile) fieldErrors.phone = "Please enter a valid 10-digit mobile number.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (values.trip && !trip) fieldErrors.trip = "Please pick a trip from the list.";
  if (!oneOf(values.month, enquiryMonths)) fieldErrors.month = "Please pick a month from the list.";
  if (variant === "group") {
    if (!groupTypes.includes(values.travellerType)) fieldErrors.travellerType = "Please choose your group type.";
    if (!size || !Number.isInteger(size) || size < 2 || size > 5000) fieldErrors.groupSize = "Please enter your group size (2 or more).";
    if (!oneOf(values.region, regionLabels)) fieldErrors.region = "Please pick a region from the list.";
    if (!oneOf(values.days, enquiryDays)) fieldErrors.days = "Please pick a trip length from the list.";
  } else {
    if (!(travellerTypes as readonly string[]).includes(values.travellerType)) fieldErrors.travellerType = "Please choose who is travelling.";
    if (size !== undefined && (!Number.isInteger(size) || size < 1 || size > 5000)) fieldErrors.groupSize = "Please enter a number of people.";
  }
  if (fd.get("consent") !== "on") fieldErrors.consent = "Please agree so we can contact you.";

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  try {
    const payload = await getCms();
    const ipHash = await visitorKey();
    if (ipHash) {
      const recent = await payload.count({
        collection: "enquiries",
        where: { and: [{ "meta.ipHash": { equals: ipHash } }, { createdAt: { greater_than: since(LIMITS.visitorWindowMs) } }] },
      });
      if (recent.totalDocs >= LIMITS.perVisitor) {
        return {
          status: "error",
          message: "You have sent several enquiries in the last few minutes. Please wait a little, or reach us on WhatsApp.",
          values,
        };
      }
    }
    const mailedToday = await payload.count({
      collection: "enquiries",
      where: { and: [{ email: { equals: values.email } }, { createdAt: { greater_than: since(LIMITS.addressWindowMs) } }] },
    });

    const tripDoc = trip
      ? (await payload.find({ collection: "trips", where: { slug: { equals: trip.slug } }, limit: 1, depth: 0 })).docs[0]
      : undefined;

    const enquiry = await payload.create({
      collection: "enquiries",
      overrideAccess: true,
      data: {
        kind: variant,
        status: "new",
        name: values.name,
        phone: `+91${mobile}`,
        email: values.email,
        trip: tripDoc?.id,
        tripName: trip?.name,
        travellerType: values.travellerType || undefined,
        groupSize: size,
        month: values.month ? (values.month.toLowerCase() as NonNullable<Enquiry["month"]>) : undefined,
        group:
          variant === "group"
            ? {
                organisation: values.organisation || undefined,
                region: values.region || undefined,
                days: values.days || undefined,
                fromCity: values.fromCity || undefined,
                interests: values.interests,
              }
            : undefined,
        message: values.message || undefined,
        meta: { sourcePath: text(fd, "sourcePath") || "/", consentAt: new Date().toISOString(), ipHash },
      },
    });

    // Sent after the response so a slow or failing mail server never blocks or fails the enquiry.
    // Capped per address so the form can't be used to flood someone's inbox.
    if (mailedToday.totalDocs < LIMITS.mailsPerAddress) {
      after(async () => {
        try {
          const contact = await getSiteSettings();
          await payload.sendEmail({
            to: values.email,
            replyTo: contact.email,
            ...enquiryConfirmationEmail({ name: values.name, tripName: trip?.name, contact }),
          });
        } catch (err) {
          console.error(`[enquiry] confirmation email failed for ${enquiry.id}`, err);
        }
      });
    }
  } catch (err) {
    console.error("[enquiry] save failed", err);
    return {
      status: "error",
      message: "We couldn't send your enquiry just now. Please try again, or reach us on WhatsApp.",
      values,
    };
  }

  return { status: "success" };
}
