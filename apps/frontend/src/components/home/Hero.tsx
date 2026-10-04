import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/content/home";
import { FOUNDED_YEAR, site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-dark text-light" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-dark/20 via-dark/30 via-40% to-dark/92" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/70 via-dark/35 via-45% to-transparent to-75%" />

      <div className="wrap flex min-h-[640px] flex-col justify-end pb-36 pt-24 md:min-h-[720px]">
        <p className="font-mono text-[12px] uppercase tracking-[.14em] text-light/80">
          {site.coordinates} — Rajkot · Est. {FOUNDED_YEAR}
        </p>
        <h1 id="hero-title" className="h-hero mt-5 max-w-4xl">
          Real trails.
          <br />
          Real people.
          <br />
          <span className="text-secondary">Since {FOUNDED_YEAR}.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-light/85">
          Eco-tourism treks, camps and nature trails from Gujarat to the Himalaya. For schools, colleges, families,
          friends, girls-only groups and solo travellers.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/trips" className="btn btn-primary">
            Explore trips →
          </Link>
          <a href="#story" className="btn btn-outline-light">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px]" aria-hidden="true">
              ▶
            </span>
            Watch our story
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[.1em] text-light/75">
          <li>★ 1,00,000+ campers</li>
          <li>★ 1,000+ camps</li>
          <li>★ Backed by a registered trust</li>
        </ul>
      </div>
    </section>
  );
}
