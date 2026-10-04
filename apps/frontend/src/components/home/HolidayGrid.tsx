import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { holidayGroups } from "@/content/home";

export function HolidayGrid() {
  return (
    <section className="wrap mt-24" aria-labelledby="holiday-title">
      <SectionHeader
        id="holiday-title"
        eyebrow="Plan by holiday"
        title="A trip for every school break"
        intro="Diwali, Christmas, summer vacation or just a weekend: here is what runs when."
        action={{ label: "All trips", href: "/trips" }}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {holidayGroups.map((h) => (
          <li key={h.key} className="reveal">
            <Link
              href={h.href}
              className="lift group relative flex h-full min-h-[260px] flex-col justify-end overflow-hidden rounded-card bg-dark p-6 text-light"
            >
              <div className="absolute inset-0 opacity-70 transition duration-700 group-hover:scale-105">
                <Image src={h.image.src} alt={h.image.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-linear-to-b from-dark/15 to-dark/90" />
              <div className="relative">
                <span className="tag border-secondary bg-secondary text-dark">{h.months}</span>
                <h3 className="display mt-3 text-[30px]">{h.title}</h3>
                <p className="mt-1 text-[14px] text-light/80">{h.highlights.join(" · ")}</p>
                <p className="mt-4 font-semibold text-secondary">{h.tripCount} trips →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
