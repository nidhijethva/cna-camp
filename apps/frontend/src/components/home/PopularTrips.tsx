import { TripCard } from "@/components/trips/TripCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Trip } from "@/types/content";

export function PopularTrips({ trips }: { trips: Trip[] }) {
  return (
    <section className="wrap mt-24" aria-labelledby="popular-title">
      <SectionHeader
        id="popular-title"
        eyebrow="Popular trips"
        title="Trips people keep coming back for"
        action={{ label: "All trips", href: "/trips" }}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => (
          <li key={t.slug} className="reveal">
            <TripCard trip={t} />
          </li>
        ))}
      </ul>
    </section>
  );
}
