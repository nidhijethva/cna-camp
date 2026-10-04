import Image from "next/image";
import Link from "next/link";
import { enquireHref, FOUNDED_YEAR, mainNav, site } from "@/content/site";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <>
      <div className="bg-dark text-light/85">
        <div className="wrap flex items-center justify-between gap-4 py-2 font-mono text-[11.5px] uppercase tracking-[.08em]">
          <span>Since {FOUNDED_YEAR} · Rajkot, Gujarat</span>
          <span className="hidden sm:inline">Backed by {site.trust.name}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-light/95 backdrop-blur">
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/img/logo.png" alt="" width={48} height={48} className="h-12 w-12" />
            <span className="leading-none">
              <span className="display block text-[19px]">{site.name}</span>
              <span className="font-mono text-[10.5px] uppercase tracking-[.1em] text-muted">Rajkot · Since {FOUNDED_YEAR}</span>
            </span>
          </Link>

          <DesktopNav items={mainNav} />

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden whitespace-nowrap font-mono text-[13px] 2xl:block">
              {site.phone}
            </a>
            <Link href={enquireHref()} className="btn btn-primary hidden py-3! sm:inline-flex">
              Enquire
            </Link>
            <MobileNav items={mainNav} />
          </div>
        </div>
      </header>
    </>
  );
}
