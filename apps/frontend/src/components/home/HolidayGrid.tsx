import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/media/Photo";
import type { HomeContent } from "@/lib/content";

export function HolidayGrid({ content }: { content: HomeContent["holidays"] }) {
  return (
    <section className="wrap mt-24" aria-labelledby="holiday-title">
      <SectionHeader
        id="holiday-title"
        eyebrow={content.eyebrow}
        title={content.title}
        intro={content.intro ?? undefined}
        action={{ label: "All trips", href: "/trips" }}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.items.map((h) => (
          <li key={h.key} className="reveal">
            <Link
              href={h.href}
              className="lift group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-card bg-dark p-6 text-light"
            >
              <div className="absolute inset-0 opacity-70 transition duration-700 group-hover:scale-105">
                <Photo img={h.image} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="absolute inset-0 bg-linear-to-b from-dark/15 to-dark/90" />
              <div className="relative">
                <span className="tag border-secondary bg-secondary text-dark">{h.months}</span>
                <h3 className="display mt-3 text-[30px]">{h.title}</h3>
                <p className="mt-1 text-[14px] text-light/80">{h.highlights.join(" · ")}</p>
                <p className="mt-4 font-semibold text-secondary">{h.tripCount} trips →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
