import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { Photo } from "@/components/media/Photo";
import { TripCard } from "@/components/trips/TripCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { travellerKinds } from "@/content/groups";
import { getSiteSettings, getTrips } from "@/lib/content";

export const metadata: Metadata = {
  title: "Girls-only & solo trips",
  description: "Girls-only batches and solo-friendly treks and camps with CNA. Solo travellers 18+. Since 1997, Rajkot.",
  alternates: { canonical: "/travellers" },
};

export default async function TravellersPage() {
  const [trips, contact] = await Promise.all([getTrips(), getSiteSettings()]);
  const easy = [...trips.filter((t) => t.difficulty === "Easy" && t.featured), ...trips.filter((t) => t.difficulty === "Easy" && !t.featured)].slice(0, 3);

  return (
    <>
      <PageHead
        img="river"
        eyebrow="Girls-only & solo"
        title="Come with your girl gang. Or come alone."
        text="Girls-only batches, solo-friendly trips and easy first adventures. You will not be alone for long."
      />

      <section className="wrap mt-20">
        <SectionHeader eyebrow="Ways to join" title="Find your way in" />
        <div className="grid gap-6 md:grid-cols-3">
          {travellerKinds.map((k) => (
            <article key={k.id} id={k.id} className="scroll-mt-28 overflow-hidden rounded-card border border-line">
              <div className="relative aspect-[16/10] bg-soft">
                <Photo img={k.img} alt={k.title} sizes="(min-width: 768px) 400px, 100vw" />
                <span className="tag absolute left-3 top-3 border-secondary bg-secondary text-dark">{k.tag}</span>
              </div>
              <div className="p-6">
                <h2 className="h-sub">{k.title}</h2>
                <ul className="mt-4 space-y-2">
                  {k.points.map((p) => (
                    <li key={p} className="flex gap-3 text-muted">
                      <span className="text-primary">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap mt-20">
        <SectionHeader eyebrow="Easy starts" title="Good trips to start with" action={{ label: "All easy trips", href: "/trips?level=easy" }} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {easy.map((t) => (
            <TripCard key={t.slug} trip={t} />
          ))}
        </div>
      </section>

      <section className="wrap mt-20">
        <div className="flex flex-col gap-6 rounded-card bg-dark p-8 text-light sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="display text-[30px]">Want a girls-only batch for your group?</p>
            <p className="mt-2 text-light/70">Tell us your dates. We plan the rest.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/group-trips#custom" className="btn btn-primary">
              Plan a trip →
            </Link>
            <a href={contact.whatsappHref} target="_blank" rel="noopener" className="btn btn-outline-light">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
