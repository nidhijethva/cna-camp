import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/media/Photo";
import { regionOrder, regions, tripsByRegionHref } from "@/content/site";
import type { HomeContent } from "@/lib/content";
import type { RegionSlug } from "@/types/content";

interface DestinationsProps {
  content: HomeContent["destinations"];
  counts: Record<RegionSlug, number>;
}

export function Destinations({ content, counts }: DestinationsProps) {
  return (
    <section className="bg-soft py-20" aria-labelledby="destinations-title">
      <div className="wrap">
        <SectionHeader
          id="destinations-title"
          eyebrow={content.eyebrow}
          title={content.title}
          intro={content.intro ?? undefined}
          action={{ label: "All destinations", href: "/destinations" }}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regionOrder.map((r) => (
            <li key={r} className="reveal">
              <Link
                href={tripsByRegionHref(r)}
                className="group relative block aspect-[3/4] overflow-hidden rounded-card bg-dark text-light"
              >
                <Photo
                  img={content.regionImages[r]}
                  alt=""
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="opacity-85 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-dark/88" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[14px] font-medium text-light/85">
                    {counts[r]} {counts[r] === 1 ? "trip" : "trips"}
                  </p>
                  <h3 className="display mt-3 text-[28px]">{regions[r].label}</h3>
                  <p className="mt-1 text-[14px] text-light/80">{regions[r].blurb}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
