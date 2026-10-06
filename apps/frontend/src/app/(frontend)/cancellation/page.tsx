import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { PageHead } from "@/components/layout/PageHead";
import { cancellationSections } from "@/content/legal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cancellation & refund policy",
  description: "CNA camp cancellation charges: 10%, 15%, 25%, 50% or 100% depending on how early you cancel.",
  alternates: { canonical: "/cancellation" },
};

export default async function CancellationPage() {
  const contact = await getSiteSettings();
  return (
    <>
      <PageHead eyebrow="Policies" title={<>Cancellation &amp; refund</>} text="Plans change. Here is exactly what happens if you need to cancel." />
      <LegalPage
        sections={cancellationSections(contact)}
        note="Draft for the preview, based on CNA’s existing cancellation rules. Refund timeline to be confirmed by CNA."
      />
    </>
  );
}
