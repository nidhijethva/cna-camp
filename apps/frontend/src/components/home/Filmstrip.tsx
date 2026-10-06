import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { HomeContent } from "@/lib/content";

/** Rendered twice for a seamless CSS loop; the second copy is aria-hidden. */
export function Filmstrip({ content }: { content: HomeContent["gallery"] }) {
  const photos = content.photos;
  const frames = [...photos, ...photos];

  return (
    <section className="mt-24 overflow-hidden bg-dark py-16 text-light" aria-labelledby="film-title">
      <div className="wrap">
        <SectionHeader
          id="film-title"
          dark
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro ?? undefined}
          action={{ label: "Gallery", href: "/gallery" }}
        />
      </div>
      <div className="film">
        <ul className="film-track">
          {frames.map((p, i) => {
            const copy = i >= photos.length;
            const n = (i % photos.length) + 1;
            return (
              <li key={i} className={`film-frame ${n % 2 ? "film-high" : "film-low"}`} aria-hidden={copy || undefined}>
                <figure>
                  <div className="film-photo">
                    <Image src={p.image.src} alt={copy ? "" : p.caption} fill sizes="280px" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.1em] text-light/60">
                    <span className="text-secondary">{String(n).padStart(2, "0")}</span>
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
