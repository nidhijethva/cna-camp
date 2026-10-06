import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { PageHead } from "@/components/layout/PageHead";
import { termsSections } from "@/content/legal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Booking, payment, safety and travel terms for CNA camps and treks.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const contact = await getSiteSettings();
  return (
    <>
      <PageHead eyebrow="Policies" title={<>Terms &amp; conditions</>} text="How booking, payments, safety and changes work on a CNA camp, in plain words." />
      <LegalPage
        sections={termsSections(contact)}
        note="Draft for the preview, written from CNA’s existing terms. To be reviewed by CNA and a legal adviser before launch."
      />
    </>
  );
}
