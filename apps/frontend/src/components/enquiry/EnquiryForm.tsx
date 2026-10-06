import { getSiteSettings, getTrips } from "@/lib/content";
import { EnquiryFormClient, type EnquiryFormProps } from "./EnquiryFormClient";

/** Loads the trip list and contact number from the CMS for the interactive form. */
export async function EnquiryForm(props: Omit<EnquiryFormProps, "trips" | "phone">) {
  const [trips, contact] = await Promise.all([getTrips(), getSiteSettings()]);
  return (
    <EnquiryFormClient
      {...props}
      trips={trips.map(({ slug, name }) => ({ slug, name }))}
      phone={{ label: contact.phone, href: contact.phoneHref }}
    />
  );
}
