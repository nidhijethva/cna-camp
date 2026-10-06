import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/icons";
import { enquireHref } from "@/content/site";
import { getSiteSettings } from "@/lib/content";

export async function ContactShortcuts() {
  const contact = await getSiteSettings();
  return (
    <>
      <a
        href={contact.whatsappHref}
        rel="noopener"
        target="_blank"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-light shadow-float transition hover:scale-105 lg:flex"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-light pb-[env(safe-area-inset-bottom)] lg:hidden"
        aria-label="Quick contact"
      >
        <a href={contact.phoneHref} className="flex h-16 items-center justify-center gap-2 font-semibold">
          Call
        </a>
        <a
          href={contact.whatsappHref}
          rel="noopener"
          target="_blank"
          className="flex h-16 items-center justify-center gap-2 border-x border-line font-semibold text-whatsapp-dark"
        >
          <WhatsAppIcon size={20} /> WhatsApp
        </a>
        <Link
          href={enquireHref()}
          className="flex h-16 items-center justify-center bg-primary font-bold uppercase tracking-[.04em] text-light"
        >
          Enquire
        </Link>
      </nav>
    </>
  );
}
