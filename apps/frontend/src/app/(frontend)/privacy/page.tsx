import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { PageHead } from "@/components/layout/PageHead";
import { privacySections } from "@/content/legal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Climber Nature Adventure Club collects, uses and protects your personal data.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const contact = await getSiteSettings();
  return (
    <>
      <PageHead eyebrow="Policies" title={<>Privacy policy</>} text="What we collect, why, and how you stay in control of your data." />
      <LegalPage
        sections={privacySections(contact)}
        note="Draft for the preview, written for India’s DPDP Act 2023. To be reviewed by CNA and a legal adviser before launch."
      />
    </>
  );
}
