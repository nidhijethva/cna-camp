import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Review } from "@/types/content";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;

  return (
    <section className="wrap mt-24" aria-labelledby="reviews-title">
      <SectionHeader
        id="reviews-title"
        eyebrow="Reviews"
        title="What campers say"
        intro="Real words from campers, parents and teachers. Shared with their permission."
      />
      <ul className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={`${r.name}-${r.quote}`} className="reveal">
            <figure className="relative flex h-full flex-col rounded-card border border-line bg-light p-6">
              {r.isSample && <span className="absolute right-5 top-5 text-[13px] text-muted">Sample</span>}
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-dark font-bold text-secondary"
                  aria-hidden="true"
                >
                  {initials(r.name)}
                </span>
                <figcaption>
                  <p className="font-bold">{r.name}</p>
                  <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{r.role}</p>
                </figcaption>
              </div>
              <p className="mt-5 text-[18px] tracking-[2px]" role="img" aria-label={`${r.rating} out of 5 stars`}>
                <span className="text-secondary">{"★".repeat(r.rating)}</span>
                <span className="text-line">{"★".repeat(5 - r.rating)}</span>
              </p>
              <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed">“{r.quote}”</blockquote>
              <div className="trail-line mt-5" />
              {r.tripName && <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[.08em] text-primary">Trip · {r.tripName}</p>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
