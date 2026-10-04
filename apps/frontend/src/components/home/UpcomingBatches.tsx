import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { regions } from "@/content/site";
import type { UpcomingBatch } from "@/lib/content";
import { formatPrice, splitDate } from "@/lib/format";

const LOW_SEATS = 8;

export function UpcomingBatches({ batches }: { batches: UpcomingBatch[] }) {
  return (
    <section className="wrap mt-24" aria-labelledby="batches-title">
      <SectionHeader
        id="batches-title"
        eyebrow="Upcoming batches"
        title={
          <>
            Pick a date. <br className="hidden sm:block" />
            Pack your bag.
          </>
        }
        intro="Fixed departures you can join alone or with friends. Seats are limited on every batch."
        action={{ label: "All batches", href: "/batches" }}
      />

      {batches.length === 0 ? (
        <p className="rounded-card border border-line p-6 text-muted">
          New dates are being planned. <Link href="/contact#enquire" className="font-semibold text-primary underline">Ask us</Link> about the next batch.
        </p>
      ) : (
        <ul className="reveal overflow-hidden rounded-card border border-line">
          {batches.map((b, i) => {
            const { day, month } = splitDate(b.startDate);
            const meta = [regions[b.trip.region].label, b.durationLabel ?? b.trip.duration, b.note].filter(Boolean);
            const price = b.price !== undefined ? b.price : b.trip.priceFrom;
            return (
              <li key={b.id} className={i > 0 ? "border-t border-line" : undefined}>
                <Link
                  href={`/trips/${b.trip.slug}`}
                  className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 p-4 transition hover:bg-soft sm:grid-cols-[84px_1.4fr_1fr_1fr_auto] sm:p-5"
                >
                  <time dateTime={b.startDate} className="block rounded-tag bg-dark py-2 text-center text-light">
                    <span className="display block text-[24px] leading-none">{day}</span>
                    <span className="mt-1 block font-mono text-[11px] tracking-[.1em] text-secondary">{month}</span>
                  </time>
                  <div>
                    <p className="text-[18px] font-bold group-hover:text-primary">{b.trip.name}</p>
                    <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{meta.join(" · ")}</p>
                    <p className="mt-1 font-mono text-[12px] sm:hidden">
                      <span className={b.seatsLeft <= LOW_SEATS ? "text-primary" : "text-dark"}>{b.seatsLeft} seats left</span>
                      <span className="text-muted"> · {formatPrice(price)}</span>
                    </p>
                  </div>
                  <p className="hidden font-mono text-[13px] sm:block">
                    <span className={b.seatsLeft <= LOW_SEATS ? "text-primary" : "text-dark"}>{b.seatsLeft} seats left</span>
                  </p>
                  <p className="display hidden text-[19px] sm:block">{formatPrice(price)}</p>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-card border border-line transition group-hover:border-primary group-hover:bg-primary group-hover:text-light"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
