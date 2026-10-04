import Image from "next/image";
import Link from "next/link";
import { regions } from "@/content/site";
import { formatNumber, formatPrice } from "@/lib/format";
import type { Trip } from "@/types/content";

export function TripCard({ trip }: { trip: Trip }) {
  const href = `/trips/${trip.slug}`;
  const facts = [
    trip.duration,
    trip.altitudeM ? `${formatNumber(trip.altitudeM)} m` : null,
    trip.difficulty ?? null,
  ].filter(Boolean);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-light transition hover:-translate-y-1 hover:shadow-card">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-soft" tabIndex={-1} aria-hidden="true">
        <Image
          src={trip.image.src}
          alt={trip.image.alt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="tag tag-solid absolute left-3 top-3">{trip.type}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">
          {regions[trip.region].label} · {trip.location}
        </p>
        <h3 className="h-card mt-2">
          <Link href={href} className="hover:text-primary">
            {trip.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">{trip.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-dark/80">
          {facts.map((f) => (
            <span key={f} className="tag">
              {f}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-5">
          <div className="trail-line" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">
              {trip.priceFrom == null ? "Price" : "From"}
            </p>
            <p className="display text-[22px]">{formatPrice(trip.priceFrom)}</p>
          </div>
          <Link
            href={href}
            className="flex h-11 w-11 items-center justify-center rounded-card bg-dark text-light transition group-hover:bg-primary"
            aria-label={`View ${trip.name}`}
          >
            →
          </Link>
        </div>
      </div>
    </article>
  );
}
