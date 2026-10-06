"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, type ReactNode } from "react";
import { submitEnquiry, type EnquiryField, type EnquiryState } from "@/actions/enquiry";
import { Select } from "@/components/ui/Select";
import { regionOrder, regions, travellerTypes } from "@/content/site";
import { enquiryDays, enquiryInterests, enquiryMonths, type EnquiryVariant } from "@/lib/enquiry";

export interface EnquiryFormProps {
  trips: { slug: string; name: string }[];
  /** For the "anything urgent, call" line after sending. */
  phone: { label: string; href: string };
  variant?: EnquiryVariant;
  defaultTrip?: string;
  title?: string;
}

const initialState: EnquiryState = { status: "idle" };

const headings: Record<EnquiryVariant, string> = {
  quick: "Plan your next trip",
  trip: "Ask about this trip",
  group: "Plan a custom trip",
};

const options = (list: readonly string[]) => list.map((x) => ({ value: x, label: x }));

export function EnquiryFormClient({ trips, phone, variant = "quick", defaultTrip = "", title }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const pathname = usePathname();
  const isGroup = variant === "group";

  const err = (f: EnquiryField) => state.fieldErrors?.[f];
  const v = state.values ?? {};
  const aria = (f: EnquiryField) => ({
    "aria-invalid": err(f) ? true : undefined,
    "aria-describedby": err(f) ? `enq-${f}-error` : undefined,
  });

  return (
    <form action={formAction} className="relative rounded-card border border-dark bg-light p-6 sm:p-8" noValidate>
      <p className="display h-sub">{title ?? headings[variant]}</p>
      <p className="mt-2 text-[15px] text-muted">
        {isGroup
          ? "Tell us about your group. We suggest 2-3 options within a day, usually on WhatsApp."
          : "We reply within a day, usually on WhatsApp."}
      </p>

      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="sourcePath" value={pathname} />
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" field="name" error={err("name")}>
          <input required name="name" defaultValue={v.name} autoComplete="name" maxLength={80} className="field mt-2" {...aria("name")} />
        </Field>
        <Field label="Phone / WhatsApp" field="phone" error={err("phone")}>
          <input
            required
            name="phone"
            defaultValue={v.phone}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={16}
            className="field mt-2"
            {...aria("phone")}
          />
        </Field>

        <Field label="Email" field="email" error={err("email")} className={isGroup ? "" : "sm:col-span-2"}>
          <input
            required
            name="email"
            type="email"
            defaultValue={v.email}
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            className="field mt-2"
            {...aria("email")}
          />
        </Field>

        {isGroup ? (
          <>
            <Field label="School / college / company (optional)" field="organisation" error={err("organisation")}>
              <input name="organisation" defaultValue={v.organisation} autoComplete="organization" className="field mt-2" />
            </Field>
            <Field label="Group type" field="travellerType" error={err("travellerType")}>
              <Select
                name="travellerType"
                emptyLabel="Choose"
                options={options(travellerTypes.slice(1))}
                defaultValue={v.travellerType}
                className="mt-2"
                {...aria("travellerType")}
              />
            </Field>
            <Field label="Group size" field="groupSize" error={err("groupSize")}>
              <input
                required
                name="groupSize"
                type="number"
                min={2}
                inputMode="numeric"
                placeholder="e.g. 40"
                defaultValue={v.groupSize}
                className="field mt-2"
                {...aria("groupSize")}
              />
            </Field>
            <Field label="Where to" field="region" error={err("region")}>
              <Select
                name="region"
                emptyLabel="Suggest for us"
                options={options(regionOrder.map((r) => regions[r].label))}
                defaultValue={v.region}
                className="mt-2"
              />
            </Field>
            <Field label="Month" field="month" error={err("month")}>
              <Select name="month" emptyLabel="Flexible" options={options(enquiryMonths)} defaultValue={v.month} className="mt-2" />
            </Field>
            <Field label="Days" field="days" error={err("days")}>
              <Select name="days" emptyLabel="Not sure" options={options(enquiryDays)} defaultValue={v.days} className="mt-2" />
            </Field>
            <Field label="Starting from (city)" field="fromCity" error={err("fromCity")}>
              <input name="fromCity" placeholder="e.g. Rajkot" defaultValue={v.fromCity} className="field mt-2" />
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="eyebrow">Interests (pick any)</legend>
              <div className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-2">
                {enquiryInterests.map((x) => (
                  <label key={x} className="flex cursor-pointer items-center gap-3 text-[15px]">
                    <input
                      type="checkbox"
                      name="interests"
                      value={x}
                      defaultChecked={v.interests?.includes(x)}
                      className="h-5 w-5 shrink-0 accent-primary"
                    />
                    {x}
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        ) : (
          <>
            <Field label="Trip" field="trip" error={err("trip")}>
              <Select
                name="trip"
                emptyLabel="Not sure yet"
                options={trips.map((t) => ({ value: t.slug, label: t.name }))}
                defaultValue={v.trip ?? defaultTrip}
                className="mt-2"
                {...aria("trip")}
              />
            </Field>
            <Field label="Who’s travelling" field="travellerType" error={err("travellerType")}>
              <Select
                name="travellerType"
                options={options(travellerTypes)}
                defaultValue={v.travellerType}
                className="mt-2"
                {...aria("travellerType")}
              />
            </Field>
            {variant === "trip" && (
              <>
                <Field label="How many people" field="groupSize" error={err("groupSize")}>
                  <input
                    name="groupSize"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    placeholder="e.g. 4"
                    defaultValue={v.groupSize}
                    className="field mt-2"
                    {...aria("groupSize")}
                  />
                </Field>
                <Field label="Preferred month" field="month" error={err("month")}>
                  <Select name="month" emptyLabel="Flexible" options={options(enquiryMonths)} defaultValue={v.month} className="mt-2" />
                </Field>
              </>
            )}
          </>
        )}

        <Field label="Message (optional)" field="message" error={err("message")} className="sm:col-span-2">
          <textarea
            name="message"
            maxLength={1000}
            placeholder={isGroup ? "Budget, special needs, ideas..." : "Any questions?"}
            defaultValue={v.message}
            className="field mt-2 min-h-24"
          />
        </Field>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-[14px]">
            <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-primary" {...aria("consent")} />
            <span className="text-muted">
              I agree that CNA can contact me about this {isGroup ? "request" : "enquiry"}, as per the{" "}
              <Link href="/privacy" className="underline">
                privacy policy
              </Link>
              . For anyone under 18, a parent or teacher fills this form.
            </span>
          </label>
          <FieldError field="consent" message={err("consent")} />
        </div>
      </div>

      {state.status === "success" && (
        <div role="status" className="mt-5 rounded-card border border-success bg-light px-4 py-3 text-[15px]">
          <p className="font-bold text-success">✓ Your {isGroup ? "trip request" : "enquiry"} has been sent successfully.</p>
          <p className="mt-1 text-muted">
            Our team will reply within a day, usually on WhatsApp. For anything urgent, call{" "}
            <a href={phone.href} className="font-semibold text-dark underline">
              {phone.label}
            </a>
            .
          </p>
        </div>
      )}

      {state.status === "error" && state.message && (
        <p role="alert" className="mt-5 rounded-card bg-primary-soft px-4 py-3 text-[15px] text-primary-hover">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full sm:w-auto">
        {pending ? "Sending…" : isGroup ? "Send trip request →" : "Send enquiry →"}
      </button>
    </form>
  );
}

function Field({
  label,
  field,
  error,
  className = "",
  children,
}: {
  label: string;
  field: EnquiryField;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="eyebrow">{label}</span>
      {children}
      <FieldError field={field} message={error} />
    </label>
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
