"use server";

import { travellerTypes } from "@/content/site";
import { tripIndex } from "@/content/trips";
import { getCms } from "@/lib/payload";

export type EnquiryField = "name" | "phone" | "trip" | "travellerType" | "message" | "consent";
type EnquiryValues = Partial<Record<Exclude<EnquiryField, "consent">, string>>;

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
  /** Echoed back on error because React resets the form after an action. */
  values?: EnquiryValues;
}

const INDIAN_MOBILE = /^(?:\+?91|0)?([6-9]\d{9})$/;

const text = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();

export async function submitEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  if (text(fd, "website")) return { status: "success" };

  const values = {
    name: text(fd, "name").replace(/\s+/g, " "),
    phone: text(fd, "phone"),
    trip: text(fd, "trip"),
    travellerType: text(fd, "travellerType"),
    message: text(fd, "message"),
  } satisfies EnquiryValues;

  const mobile = values.phone.replace(/[\s()-]/g, "").match(INDIAN_MOBILE)?.[1];
  const trip = values.trip ? tripIndex.find((t) => t.slug === values.trip) : undefined;

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (values.name.length < 2 || values.name.length > 80) fieldErrors.name = "Please enter your name.";
  if (!mobile) fieldErrors.phone = "Please enter a valid 10-digit mobile number.";
  if (values.trip && !trip) fieldErrors.trip = "Please pick a trip from the list.";
  if (!(travellerTypes as readonly string[]).includes(values.travellerType))
    fieldErrors.travellerType = "Please choose who is travelling.";
  if (values.message.length > 1000) fieldErrors.message = "Please keep the message under 1,000 characters.";
  if (fd.get("consent") !== "on") fieldErrors.consent = "Please agree so we can contact you.";

  if (Object.keys(fieldErrors).length) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  try {
    const payload = await getCms();
    const tripDoc = trip
      ? (await payload.find({ collection: "trips", where: { slug: { equals: trip.slug } }, limit: 1, depth: 0 })).docs[0]
      : undefined;

    await payload.create({
      collection: "enquiries",
      overrideAccess: true,
      data: {
        kind: "quick",
        status: "new",
        name: values.name,
        phone: `+91${mobile}`,
        trip: tripDoc?.id,
        tripName: trip?.name,
        travellerType: values.travellerType,
        message: values.message || undefined,
        meta: { sourcePath: text(fd, "sourcePath").slice(0, 200) || "/", consentAt: new Date().toISOString() },
      },
    });
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
