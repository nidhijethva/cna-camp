import "server-only";
import { regionOrder } from "@/content/site";
import { batches, popularTripSlugs, tripIndex, trips } from "@/content/trips";
import { todayInIndia } from "@/lib/format";
import type { Batch, RegionSlug, Trip } from "@/types/content";

/* Async on purpose: these become backend API calls without changing callers. */

export async function getTripIndex() {
  return tripIndex;
}

export async function getTrip(slug: string): Promise<Trip | undefined> {
  return trips.find((t) => t.slug === slug);
}

export async function getPopularTrips(): Promise<Trip[]> {
  return popularTripSlugs.flatMap((slug) => trips.find((t) => t.slug === slug) ?? []);
}

export async function getRegionTripCounts(): Promise<Record<RegionSlug, number>> {
  const counts = Object.fromEntries(regionOrder.map((r) => [r, 0])) as Record<RegionSlug, number>;
  for (const t of tripIndex) counts[t.region] += 1;
  return counts;
}

export interface UpcomingBatch extends Batch {
  trip: Trip;
}

export async function getUpcomingBatches(limit?: number): Promise<UpcomingBatch[]> {
  const today = todayInIndia();
  const upcoming = batches
    .filter((b) => b.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .flatMap((b) => {
      const trip = trips.find((t) => t.slug === b.tripSlug);
      return trip ? [{ ...b, trip }] : [];
    });
  return limit ? upcoming.slice(0, limit) : upcoming;
}
