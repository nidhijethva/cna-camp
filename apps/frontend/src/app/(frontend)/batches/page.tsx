import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { regions } from "@/content/site";
import { getUpcomingBatches } from "@/lib/content";
import { durationShort, tripPrice } from "@/lib/trips";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Upcoming batches",
  description: "Fixed-departure treks and camps with CNA. Join alone or with friends. Dates, seats left and prices.",
  alternates: { canonical: "/batches" },
};

const LOW_SEATS = 8;
const dayMonth = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

export default async function BatchesPage() {
  const batches = await getUpcomingBatches();

  return (
    <>
      <PageHead
        eyebrow="Upcoming batches"
        title="Fixed departures. Join alone or with friends."
        text="Sample dates for the preview. Real dates come from the CNA team."
      />
      <section className="wrap mt-12">
        <div className="overflow-hidden rounded-card border border-line">
          <div className="hidden grid-cols-[120px_1.5fr_1fr_1fr_1fr_auto] gap-4 bg-dark px-5 py-3 font-mono text-[11.5px] uppercase tracking-[.08em] text-light/70 md:grid">
            <span>Date</span>
            <span>Trip</span>
            <span>Region</span>
            <span>Seats</span>
            <span>Price</span>
            <span />
          </div>
          {batches.map((b, i) => (
            <div
              key={`${b.tripSlug}-${b.startDate}`}
              className={`grid gap-3 p-5 md:grid-cols-[120px_1.5fr_1fr_1fr_1fr_auto] md:items-center md:gap-4 ${i ? "border-t border-line" : ""}`}
            >
              <p className="font-mono text-[14px] font-medium">
                <time dateTime={b.startDate}>{dayMonth(b.startDate)}</time> – <time dateTime={b.endDate}>{dayMonth(b.endDate)}</time>
              </p>
              <div>
                <Link href={`/trips/${b.trip.slug}`} className="text-[19px] font-bold hover:text-primary">
                  {b.trip.name}
                </Link>
                {b.note && <span className="tag ml-2 border-secondary bg-secondary text-dark">{b.note}</span>}
              </div>
              <p className="text-muted">
                {regions[b.trip.region].label} · {durationShort(b.trip)}
              </p>
              <p className={`font-mono text-[13px] ${b.seatsLeft <= LOW_SEATS ? "text-primary" : ""}`}>{b.seatsLeft} seats left</p>
              <p className="display text-[19px]">{tripPrice(b.trip)}</p>
              <Link href={`/trips/${b.trip.slug}#enquire`} className="btn btn-primary py-3!">
                Book
              </Link>
            </div>
          ))}
          {batches.length === 0 && <p className="p-8 text-center text-muted">New dates are being planned. Check back soon or ask us.</p>}
        </div>
        <p className="mt-6 text-muted">
          Want your own dates?{" "}
          <Link href="/group-trips" className="font-bold text-primary underline">
            Plan a group trip
          </Link>
          .
        </p>
      </section>
    </>
  );
}
