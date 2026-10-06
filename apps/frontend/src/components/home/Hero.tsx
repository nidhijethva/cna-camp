import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { FOUNDED_YEAR, site } from "@/content/site";
import type { HomeContent } from "@/lib/content";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  const lines = content.headingLines;
  return (
    <section className="relative isolate overflow-hidden bg-dark text-light" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo
          img={content.image}
          preload
          sizes="100vw"
          className="animate-kenburns"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-dark/20 via-dark/30 via-40% to-dark/92" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/70 via-dark/35 via-45% to-transparent to-75%" />

      <div className="wrap flex min-h-[640px] flex-col justify-end pb-36 pt-24 md:min-h-[720px]">
        <p className="font-mono text-[12px] uppercase tracking-[.14em] text-light/80">
          {site.coordinates} — Rajkot · Est. {FOUNDED_YEAR}
        </p>
        <h1 id="hero-title" className="h-hero mt-5 max-w-4xl">
          {lines.map((line, i) =>
            i === lines.length - 1 ? (
              <span key={i} className="text-secondary">
                {line}
              </span>
            ) : (
              <span key={i}>
                {line}
                <br />
              </span>
            ),
          )}
        </h1>
        <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-light/85">{content.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/trips" className="btn btn-primary">
            Explore trips →
          </Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-[.1em] text-light/75">
          {content.highlights.map((h) => (
            <li key={h}>★ {h}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
