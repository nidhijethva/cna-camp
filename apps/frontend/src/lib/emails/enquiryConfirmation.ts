import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/content";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

interface ConfirmationInput {
  name: string;
  tripName?: string;
  contact: Pick<SiteSettings, "phone" | "phoneHref">;
}

export function enquiryConfirmationEmail({ name, tripName, contact }: ConfirmationInput) {
  const firstName = name.split(" ")[0];
  const about = tripName ? `your enquiry about ${tripName}` : "your enquiry";
  const subject = `We got your enquiry · ${site.name}`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Thank you for contacting ${site.name}. We have received ${about}, and our team will get in touch with you soon, usually within a day on WhatsApp or phone.`,
    "",
    `For anything urgent, call or WhatsApp us on ${contact.phone}.`,
    "",
    `Team ${site.name}`,
    site.legalName,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f6f4ef;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;font-size:16px;line-height:1.6">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
      <p style="margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 16px">Thank you for contacting ${site.name}. We have received ${escapeHtml(about)}, and our team will get in touch with you soon, usually within a day on WhatsApp or phone.</p>
      <p style="margin:0 0 24px">For anything urgent, call or WhatsApp us on <a href="${escapeHtml(contact.phoneHref)}" style="color:#1f1f1f;font-weight:bold">${escapeHtml(contact.phone)}</a>.</p>
      <p style="margin:0">Team ${site.name}<br><span style="color:#6b6b6b">${site.legalName}</span></p>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
