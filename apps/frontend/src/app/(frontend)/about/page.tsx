import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { Photo } from "@/components/media/Photo";
import { CountUp } from "@/components/ui/CountUp";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { campLife, different, ecoPrinciples, founder, mission, safetyPoints, storyParagraphs, teamRoles } from "@/content/about";
import { site, yearsActive } from "@/content/site";
import { getFaqs, getTrips } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Climber Nature Adventure Club (CNA) is an eco-tourism and adventure club from Rajkot, backed by Saurashtra Education & Charitable Trust. Camps since 1997.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const [trips, faqs] = await Promise.all([getTrips(), getFaqs()]);
  const stats = [
    [`${yearsActive()}+`, "Years of camps"],
    ["1,000+", "Camps & treks run"],
    ["1,00,000+", "Campers taken outdoors"],
    [String(trips.length), "Treks, camps & nature trails"],
  ];
  const timeline = [
    ["1997", "First camp: a Marine Camp at Bet Dwarka, walking the coral reef at low tide."],
    ["2000", `${site.trust.name} registered (Reg. ${site.trust.registration}). CNA camps run with its backing.`],
    ["Today", `Own campus in Manali, partner campus at Bet Dwarka, ${trips.length} treks, camps and nature trails.`],
    ["2026", "Adventure Olympiad 1.0: an Eco-STEM quiz with Himalayan camp scholarships."],
  ];

  return (
    <>
      <PageHead
        img="meadow"
        eyebrow="About CNA"
        title="A nature club that takes you outdoors. Since 1997."
        text={`Climber Nature Adventure Club (CNA) is an eco-tourism and adventure club from Rajkot. Backed by ${site.trust.name}.`}
      />

      <section className="wrap mt-20 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="h-section mt-3">It started with one marine camp</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted">
            {storyParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ol className="mt-10 border-l-2 border-dashed border-line pl-6">
            {timeline.map(([year, text]) => (
              <li key={year} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                <p className="display text-[22px] text-primary">{year}</p>
                <p className="mt-1">{text}</p>
              </li>
            ))}
          </ol>
        </div>
        <figure>
          <div className="relative aspect-[4/5] overflow-hidden rounded-card">
            <Photo img="river" alt="A CNA group crossing a Himalayan river together" sizes="(min-width: 1024px) 590px, 100vw" />
          </div>
          <figcaption className="mt-3 font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">A CNA group on the trail</figcaption>
        </figure>
      </section>

      <section className="wrap mt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
          {stats.map(([n, label]) => (
            <div key={label} className="bg-light p-6 sm:p-8">
              <dt className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{label}</dt>
              <dd>
                <CountUp value={n} className="display mt-2 text-[40px] sm:text-[52px]" />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="mission" className="topo mt-24 scroll-mt-28 bg-soft py-20">
        <div className="wrap">
          <SectionHeader eyebrow="Our mission · Eco-tourism" title={mission.line} intro={mission.text} />
          <ul className="grid gap-6 md:grid-cols-3">
            {mission.points.map(([title, text], i) => (
              <li key={title} className="rounded-card border border-line bg-light p-6">
                <p className="font-mono text-[12px] text-primary">0{i + 1}</p>
                <h3 className="mt-2 text-[21px] leading-normal">{title}</h3>
                <p className="mt-2 text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-8 rounded-card bg-light p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="eyebrow">What eco-tourism means to us</p>
              <p className="display h-sub mt-2">Travel that protects nature and supports local people</p>
              <p className="mt-3 text-muted">
                That is how The International Ecotourism Society describes it, and it is how we have run camps since 1997.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ecoPrinciples.map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-1 text-primary">✓</span>
                  <span>
                    <strong>{title}.</strong> <span className="text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="camp-life" className="wrap mt-24 scroll-mt-28">
        <SectionHeader
          eyebrow="Life at camp"
          title="What a CNA camp is like"
          intro="The same simple rhythm since 1997: adventure by day, good food, rest, and the outdoors all around."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {campLife.map(([icon, title, text]) => (
            <div key={title} className="rounded-card border border-line p-6">
              <span className="text-[28px]" aria-hidden="true">
                {icon}
              </span>
              <h3 className="h-card mt-3">{title}</h3>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="founder" className="mt-24 scroll-mt-20 bg-dark py-20 text-light sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start">
          <figure className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Photo img="stock/tribute" alt="Sunrise over Himalayan peaks" sizes="(min-width: 1024px) 480px, 100vw" />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-dark/90 p-6 pt-20">
                <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-light/70">In loving memory</p>
                <p className="display mt-1 text-[30px]">{founder.name}</p>
                <p className="font-mono text-[12px] text-secondary">{founder.years}</p>
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[.08em] text-light/45">Photo of Dr. Trivedi to be added</figcaption>
          </figure>
          <div>
            <p className="eyebrow text-light/60!">Our founder</p>
            <h2 className="h-section mt-3">Late {founder.name}</h2>
            <blockquote className="mt-6 border-l-4 border-secondary pl-5 text-[22px] italic leading-snug text-light/90">
              “{founder.quote}”
            </blockquote>
            <p className="mt-6 text-[17px] leading-relaxed text-light/75">{founder.intro}</p>
            <dl className="mt-10 divide-y divide-light/10 border-y border-light/10">
              {founder.facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-5 sm:grid-cols-[150px_1fr] sm:gap-6">
                  <dt className="font-mono text-[11.5px] uppercase tracking-[.08em] text-secondary">{k}</dt>
                  <dd className="text-light/85">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 rounded-card bg-light/5 p-5 text-light/80">
              <span className="font-bold text-light">His legacy.</span> {founder.legacy}{" "}
              <Link href="/olympiad" className="font-bold text-secondary underline">
                About the Olympiad →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="different" className="wrap mt-24 scroll-mt-28">
        <SectionHeader eyebrow="Why CNA" title="What makes CNA different" intro="Many companies sell trips. CNA is a nature club with a purpose." />
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {different.map(([title, text], i) => (
            <li key={title} className="bg-light p-6 sm:p-8">
              <p className="display text-[44px] leading-none text-primary">0{i + 1}</p>
              <h3 className="mt-4 text-[21px] leading-normal">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
          <li className="flex flex-col justify-between bg-dark p-6 text-light sm:p-8">
            <p className="text-[21px] font-bold">Find your trip</p>
            <p className="mt-2 text-light/70">{trips.length} treks, camps and nature trails across Gujarat, India and beyond.</p>
            <Link href="/trips" className="btn btn-primary mt-6 self-start">
              See all trips →
            </Link>
          </li>
        </ol>
      </section>

      <section className="wrap mt-20">
        <div className="flex flex-col gap-6 rounded-card border border-dark p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="eyebrow">Backed by</p>
            <p className="mt-2 text-[24px] font-bold">{site.trust.name}</p>
            <p className="mt-1 text-muted">Registered charitable trust · Reg. {site.trust.registration} · Rajkot</p>
          </div>
          <Link href="/contact" className="btn btn-outline shrink-0">
            Contact us →
          </Link>
        </div>
      </section>

      <section id="safety" className="mt-24 scroll-mt-20 bg-dark py-20 text-light">
        <div className="wrap">
          <p className="eyebrow text-light/60!">Safety</p>
          <h2 className="h-section mt-3">How we keep trips safe</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {safetyPoints.map(([title, text]) => (
              <li key={title} className="border-t border-light/15 pt-4">
                <h3 className="text-[19px] leading-normal">{title}</h3>
                <p className="mt-1 text-light/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap mt-20">
        <h2 className="h-section">Team &amp; trip leaders</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamRoles.map((role, i) => (
            <div key={i} className="rounded-card border border-line p-5">
              <div className="topo aspect-square rounded-tag bg-soft" />
              <p className="mt-4 font-bold">Name to add</p>
              <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="wrap mt-20 max-w-3xl scroll-mt-28">
        <p className="eyebrow">FAQs</p>
        <h2 className="h-section mt-3">Questions people ask</h2>
        <FaqList faqs={faqs} className="mt-6" />
      </section>
    </>
  );
}
