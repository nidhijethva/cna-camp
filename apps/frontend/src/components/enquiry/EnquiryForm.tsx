"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { submitEnquiry, type EnquiryField, type EnquiryState } from "@/actions/enquiry";
import { Select } from "@/components/ui/Select";
import { site, travellerTypes } from "@/content/site";

interface EnquiryFormProps {
  trips: { slug: string; name: string }[];
  defaultTrip?: string;
}

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm({ trips, defaultTrip = "" }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const pathname = usePathname();

  if (state.status === "success") {
    return (
      <div className="rounded-card border border-dark bg-light p-6 sm:p-8" role="status">
        <p className="display h-sub">Thank you! We got your enquiry.</p>
        <p className="mt-3 text-muted">
          Our team will reply within a day, usually on WhatsApp. For anything urgent, call{" "}
          <a href={site.phoneHref} className="font-semibold text-dark underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (f: EnquiryField) => state.fieldErrors?.[f];
  const v = state.values ?? {};
  const fieldProps = (f: EnquiryField) => ({
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `enq-${f}-error` : undefined,
  });

  return (
    <form action={formAction} className="relative rounded-card border border-dark bg-light p-6 sm:p-8" noValidate>
      <p className="display h-sub">Plan your next trip</p>
      <p className="mt-2 text-[15px] text-muted">We reply within a day, usually on WhatsApp.</p>

      <input type="hidden" name="sourcePath" value={pathname} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">Your name</span>
          <input required name="name" defaultValue={v.name} autoComplete="name" maxLength={80} className="field mt-2" {...fieldProps("name")} />
          <FieldError field="name" message={err("name")} />
        </label>
        <label className="block">
          <span className="eyebrow">Phone / WhatsApp</span>
          <input
            required
            name="phone"
            defaultValue={v.phone}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={16}
            className="field mt-2"
            {...fieldProps("phone")}
          />
          <FieldError field="phone" message={err("phone")} />
        </label>
        <label className="block">
          <span className="eyebrow">Trip</span>
          <Select
            name="trip"
            emptyLabel="Not sure yet"
            options={trips.map((t) => ({ value: t.slug, label: t.name }))}
            defaultValue={v.trip ?? defaultTrip}
            className="mt-2"
            {...fieldProps("trip")}
          />
          <FieldError field="trip" message={err("trip")} />
        </label>
        <label className="block">
          <span className="eyebrow">Who’s travelling</span>
          <Select
            name="travellerType"
            options={travellerTypes.map((t) => ({ value: t, label: t }))}
            defaultValue={v.travellerType}
            className="mt-2"
            {...fieldProps("travellerType")}
          />
          <FieldError field="travellerType" message={err("travellerType")} />
        </label>
        <label className="block sm:col-span-2">
          <span className="eyebrow">Message (optional)</span>
          <textarea
            name="message"
            defaultValue={v.message}
            maxLength={1000}
            placeholder="Any questions?"
            className="field mt-2 min-h-[96px]"
            {...fieldProps("message")}
          />
          <FieldError field="message" message={err("message")} />
        </label>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-[14px]">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-5 w-5 shrink-0 accent-primary"
              {...fieldProps("consent")}
            />
            <span className="text-muted">
              I agree that CNA can contact me about this enquiry, as per the{" "}
              <Link href="/privacy" className="underline">
                privacy policy
              </Link>
              . For anyone under 18, a parent or teacher fills this form.
            </span>
          </label>
          <FieldError field="consent" message={err("consent")} />
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="mt-5 rounded-card bg-primary/10 px-4 py-3 text-[15px] text-primary-hover">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full sm:w-auto">
        {pending ? "Sending…" : "Send enquiry →"}
      </button>
    </form>
  );
}

function FieldError({ field, message }: { field: EnquiryField; message?: string }) {
  if (!message) return null;
  return (
    <span id={`enq-${field}-error`} className="mt-1.5 block text-[13px] text-primary-hover">
      {message}
    </span>
  );
}
