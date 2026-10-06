import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { PageHead } from "@/components/layout/PageHead";
import { PhotoPlaceholder } from "@/components/media/Photo";
import { site } from "@/content/site";
import { getSiteSettings, type SiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Call, WhatsApp or email Climber Nature Adventure Club, Rajkot. Office near 80 ft Road, Rajkot. Plan a camp, trek or school trip.",
  alternates: { canonical: "/contact" },
};

const contactWays = (contact: SiteSettings) => [
  { label: "Call", value: contact.phone, href: contact.phoneHref, note: "Mon–Sat, office hours (to confirm)" },
  { label: "WhatsApp", value: "Chat with us", href: contact.whatsappHref, note: "Fastest reply, usually the same day" },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, note: "Trips, camps and groups" },
  ...(contact.trustEmail
    ? [{ label: "Trust email", value: contact.trustEmail, href: `mailto:${contact.trustEmail}`, note: site.trust.name }]
    : []),
];

export default async function ContactPage() {
  const contact = await getSiteSettings();
  const ways = contactWays(contact);

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Talk to a real person"
        text="Fill the form or reach us directly. Our team usually replies within a day, most often on WhatsApp."
      />
      <section className="wrap mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {ways.map((w) => (
            <a
              key={w.label}
              href={w.href}
              target={w.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener"
              className="lift flex items-center justify-between gap-4 rounded-card border border-line p-5 hover:border-dark"
            >
              <span className="min-w-0">
                <span className="eyebrow">{w.label}</span>
                <span className="mt-1 block break-all text-[19px] font-bold">{w.value}</span>
                <span className="text-[14px] text-muted">{w.note}</span>
              </span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
          <div className="overflow-hidden rounded-card border border-line">
            <div className="relative aspect-[16/9]">
              <PhotoPlaceholder label="Map of our Rajkot office" />
            </div>
            <div className="p-5">
              <p className="eyebrow">Office</p>
              <p className="mt-2 font-semibold">{contact.address.full}</p>
              <p className="mt-1 text-[14px] text-muted">Visits by appointment. Please call before you come.</p>
              {contact.mapHref && (
                <a href={contact.mapHref} target="_blank" rel="noopener" className="btn btn-outline mt-4">
                  Open in Google Maps →
                </a>
              )}
            </div>
          </div>
          <div id="payments" className="scroll-mt-28 rounded-card bg-soft p-5">
            <p className="eyebrow">Payments</p>
            <p className="mt-2">
              Book with a 25% advance once your batch is confirmed; the balance is due 3 days before departure. Payment details are
              shared directly by our team, never on public pages.
            </p>
          </div>
        </div>
        <div id="enquire" className="scroll-mt-28">
          <EnquiryForm title="Send us an enquiry" />
        </div>
      </section>
    </>
  );
}
