import Image from "next/image";
import Link from "next/link";
import { footerNav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-dark text-light">
      <div className="wrap grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/img/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <p className="display text-2xl">
              Climber Nature
              <br />
              Adventure Club
            </p>
          </div>
          <p className="mt-5 max-w-sm text-light/70">
            Treks, camps and outdoor learning from Rajkot since 1997. Backed by {site.trust.name}.
          </p>
          <div className="mt-6 flex gap-2">
            {site.social.map((s) =>
              s.href ? (
                <a key={s.label} href={s.href} className="tag py-2 text-light/80 hover:text-secondary lg:py-1" rel="noopener" target="_blank">
                  {s.label}
                </a>
              ) : (
                <span key={s.label} className="tag py-2 text-light/50 lg:py-1">
                  {s.label}
                </span>
              ),
            )}
          </div>
        </div>

        <FooterLinks title="Trips by region" links={footerNav.regions} />
        <FooterLinks title="Company" links={footerNav.company} />

        <div>
          <p className="eyebrow text-light/50!">Talk to us</p>
          <address className="mt-4 space-y-3 not-italic text-light/85">
            <p>
              <a href={site.phoneHref} className="font-mono hover:text-secondary">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.whatsappHref} className="hover:text-secondary" rel="noopener" target="_blank">
                WhatsApp chat
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="break-all hover:text-secondary">
                {site.email}
              </a>
            </p>
            <p className="text-sm text-light/60">{site.address.full}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-light/10">
        <div className="wrap flex flex-col gap-3 py-6 font-mono text-[11.5px] uppercase tracking-[.08em] text-light/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <span className="flex flex-wrap gap-4">
            {footerNav.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-light">
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="eyebrow text-light/50!">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 hover:text-secondary lg:py-0">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
