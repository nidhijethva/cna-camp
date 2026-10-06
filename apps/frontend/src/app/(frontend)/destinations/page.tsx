import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { Photo } from "@/components/media/Photo";
import { regionOrder, regions, tripsByRegionHref } from "@/content/site";
import { getHome, getTrips } from "@/lib/content";
import { durationShort } from "@/lib/trips";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Where CNA goes: the Gujarat coast and forests, the Himalaya and the rest of India, the North-East and Nepal.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  const [trips, home] = await Promise.all([getTrips(), getHome()]);
  const { regionImages } = home.destinations;

  return (
    <>
      <PageHead
        eyebrow="Destinations"
        title="Where we go"
        text="Coast, forest, desert and high mountains: Gujarat, across India, the North-East and Nepal. We pick the right place for each season and each group."
      />
      <section className="wrap mt-12 space-y-16">
        {regionOrder.map((r) => {
          const list = trips.filter((t) => t.region === r);
          return (
            <div key={r} id={r} className="grid scroll-mt-28 gap-8 lg:grid-cols-[420px_1fr]">
              <Link href={tripsByRegionHref(r)} className="relative block aspect-[4/3] overflow-hidden rounded-card">
                <Photo img={regionImages[r]} alt="" sizes="(min-width: 1024px) 420px, 100vw" />
                <span className="tag tag-solid absolute left-4 top-4">
                  {list.length} {list.length === 1 ? "trip" : "trips"}
                </span>
              </Link>
              <div>
                <h2 className="h-section">{regions[r].label}</h2>
                <p className="mt-2 text-muted">{regions[r].blurb}</p>
                <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
                  {list.map((t) => (
                    <li key={t.slug} className="bg-light">
                      <Link href={`/trips/${t.slug}`} className="flex items-center justify-between gap-3 p-4 hover:bg-soft">
                        <span>
                          <span className="block font-bold">{t.name}</span>
                          <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">
                            {t.type} · {durationShort(t)} · {t.months.slice(0, 3).join(" ")}
                          </span>
                        </span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
