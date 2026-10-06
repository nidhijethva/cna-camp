"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { Select } from "@/components/ui/Select";
import { enquireHref } from "@/content/site";

export interface FilterableTrip {
  slug: string;
  region: string;
  type: string;
  level: string;
  months: string[];
  days: number;
  card: ReactNode;
}

type Filters = { region: string; type: string; month: string; level: string; short: boolean };

const EMPTY: Filters = { region: "", type: "", month: "", level: "", short: false };
const KEYS = ["region", "type", "month", "level"] as const;

interface TripFiltersProps {
  trips: FilterableTrip[];
  regionOptions: { value: string; label: string }[];
  typeOptions: { value: string; label: string }[];
  monthOptions: { value: string; label: string }[];
  levelOptions: { value: string; label: string }[];
}

/** Filters run in the browser (all cards are server-rendered for search engines); the URL mirrors the choice. */
export function TripFilters({ trips, regionOptions, typeOptions, monthOptions, levelOptions }: TripFiltersProps) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [loadedFromUrl, setLoadedFromUrl] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only readable after hydration
    setFilters({
      region: q.get("region") ?? "",
      type: q.get("type") ?? "",
      month: q.get("month") ?? "",
      level: q.get("level") ?? "",
      short: q.get("short") === "1",
    });
    setLoadedFromUrl(true);
  }, []);

  useEffect(() => {
    if (!loadedFromUrl) return;
    const q = new URLSearchParams();
    for (const k of KEYS) if (filters[k]) q.set(k, filters[k]);
    if (filters.short) q.set("short", "1");
    window.history.replaceState(null, "", q.size ? `?${q}` : window.location.pathname);
  }, [filters, loadedFromUrl]);

  // Functional update: the select can report a change while URL values are still being applied.
  const setFilter = (key: (typeof KEYS)[number], value: string) =>
    setFilters((prev) => (prev[key] === value ? prev : { ...prev, [key]: value }));

  const matches = (t: FilterableTrip) =>
    (!filters.region || t.region === filters.region) &&
    (!filters.type || t.type === filters.type) &&
    (!filters.level || t.level === filters.level) &&
    (!filters.month || t.months.includes(filters.month)) &&
    (!filters.short || t.days <= 3);

  const count = trips.filter(matches).length;
  const field = (key: (typeof KEYS)[number], label: string, emptyLabel: string, options: { value: string; label: string }[]) => (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <Select
        name={key}
        emptyLabel={emptyLabel}
        options={options}
        value={filters[key]}
        onValueChange={(v) => setFilter(key, v)}
        className="mt-2"
      />
    </label>
  );

  return (
    <>
      <form
        role="search"
        aria-label="Filter trips"
        className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(4,1fr)_auto]"
        onSubmit={(e) => e.preventDefault()}
      >
        {field("region", "Region", "All regions", regionOptions)}
        {field("type", "Type", "All types", typeOptions)}
        {field("month", "Month", "Any month", monthOptions)}
        {field("level", "Level", "Any level", levelOptions)}
        <button type="button" onClick={() => setFilters(EMPTY)} className="btn btn-outline col-span-2 self-end lg:col-span-1">
          Clear
        </button>
      </form>
      <p className="mt-6 font-mono text-[12.5px] uppercase tracking-[.08em] text-muted" aria-live="polite">
        {count} {count === 1 ? "trip" : "trips"}
        {filters.short && " · 3 days or less"}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((t) => (
          <div key={t.slug} hidden={!matches(t)}>
            {t.card}
          </div>
        ))}
      </div>
      {count === 0 && (
        <p className="mt-10 rounded-card bg-soft p-8 text-center">
          No trips match. Try another month or{" "}
          <Link href={enquireHref()} className="font-bold text-primary underline">
            ask us for a custom trip
          </Link>
          .
        </p>
      )}
    </>
  );
}
