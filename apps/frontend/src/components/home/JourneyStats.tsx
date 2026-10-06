import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { StatIcon, type StatIconName } from "@/components/ui/icons";
import { FOUNDED_YEAR, yearsActive } from "@/content/site";

interface JourneyStatsProps {
  tripCount: number;
  /** Edited in Site settings → Numbers. */
  counts: { campers: string; camps: string };
}

export function JourneyStats({ tripCount, counts }: JourneyStatsProps) {
  const stats: { icon: StatIconName; value: string; label: string }[] = [
    { icon: "mountain", value: `${yearsActive()}+`, label: "Years of camps" },
    { icon: "bolt", value: counts.camps, label: "Camps & treks run" },
    { icon: "people", value: counts.campers, label: "Campers taken outdoors" },
    { icon: "pin", value: String(tripCount), label: "Treks, camps & nature trails" },
  ];

  return (
    <section className="relative isolate mt-24 overflow-hidden bg-dark text-light" aria-labelledby="journey-title">
      <div className="absolute inset-0 -z-10 opacity-40">
        <Image src="/img/peaks-wide.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-dark/75 to-dark/90" />
      <div className="wrap py-20 text-center">
        <p className="eyebrow text-secondary!">Our journey so far</p>
        <h2 id="journey-title" className="h-section mx-auto mt-3 max-w-3xl">
          Trusted by campers across Gujarat for nearly 30 years
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] text-light/75">
          From one marine camp in {FOUNDED_YEAR} to {counts.camps} camps across India and Nepal. Here is CNA in numbers.
        </p>
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="reveal rounded-card border border-light/15 bg-light/5 px-4 py-8 backdrop-blur-sm">
              <StatIcon name={s.icon} className="mx-auto text-secondary" />
              <CountUp value={s.value} className="display mt-4 text-[44px] sm:text-[52px]" />
              <p className="mt-1 text-[15px] text-light/75">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
