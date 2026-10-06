import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GroupFinder } from "@/components/olympiad/GroupFinder";
import { Photo } from "@/components/media/Photo";
import { CountUp } from "@/components/ui/CountUp";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { olympiad as o } from "@/content/olympiad";
import { site } from "@/content/site";
import { getSiteSettings, whatsappLink } from "@/lib/content";
import { registrationStatus } from "@/lib/olympiad";

// Registration status depends on today's date.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Adventure Olympiad 1.0 · Eco-STEM quiz & Manali camp scholarship",
  description:
    "India’s 1st Adventure Olympiad: an Eco-STEM online quiz for ages 14-25 in Gujarat. Win up to 100% scholarship for the ₹18,000 Astro Adventure Trekking Camp in Manali.",
  alternates: { canonical: "/olympiad" },
};

const jumpLinks = [
  ["dates", "Dates & fees"],
  ["groups", "Groups"],
  ["finder", "Which group am I?"],
  ["how", "How it works"],
  ["quiz", "Quiz"],
  ["scholarships", "Scholarships"],
  ["included", "Manali camp"],
  ["rules", "Rules"],
  ["faq", "FAQs"],
];

const statusText = {
  soon: "Registration opens 02 April 2026",
  open: "Registration open · closes 20 June 2026",
  closed: "Registration closed on 20 June 2026 · quiz rounds in progress",
};

export default async function OlympiadPage() {
  const contact = await getSiteSettings();
  const whatsappUpdates = whatsappLink(contact.whatsappNumber, "Hi CNA, please send me Adventure Olympiad updates.");
  const status = registrationStatus();
  const cta = status === "open" ? { href: o.formUrl, label: "Register now · from ₹90 →" } : { href: whatsappUpdates, label: "Get Olympiad updates on WhatsApp →" };
  const pdfs = { lavkumarPdf: o.lavkumarPdf, ketankumarPdf: o.ketankumarPdf } as const;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div className="kenburns absolute inset-0 -z-10 overflow-hidden opacity-80">
          <Photo img="peaks" wide preload sizes="100vw" alt="Snow peaks above a green Himalayan valley near Manali" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/92 via-dark/55 via-60% to-dark/30" />
        <div className="wrap py-20 sm:py-28">
          <p className="inline-flex items-center gap-2 rounded-tag bg-secondary px-3 py-1.5 font-mono text-[11.5px] font-medium uppercase tracking-[.1em] text-dark">
            ★ {o.tagline}
          </p>
          <h1 className="h-page mt-5 max-w-4xl">{o.name}</h1>
          <p className="mt-2 font-mono text-[12.5px] uppercase tracking-[.14em] text-secondary">Eco-STEM online quiz · Mountain · Desert · Marine</p>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-light/85">
            Take the Eco-STEM quiz. Score high and win up to <strong className="text-light">100% scholarship</strong> for the Astro
            Adventure Trekking Camp in Manali. Open for students aged 14–25 and teachers from{" "}
            <strong className="text-light">every district of Gujarat</strong>. Camp fee ₹18,000: your scholarship covers it.
          </p>
          <p className={`mt-6 inline-flex items-center gap-2 text-[15px] font-semibold ${status === "open" ? "text-live-light" : "text-light/85"}`}>
            <span className={`h-2 w-2 rounded-full ${status === "open" ? "bg-live" : "bg-secondary"}`} />
            {statusText[status]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta.href} target="_blank" rel="noopener" className="btn btn-primary">
              {cta.label}
            </a>
            <a href={o.rulesPdf} target="_blank" rel="noopener" className="btn btn-outline-light">
              Rules &amp; regulations (PDF)
            </a>
            <a href="#how" className="btn border-transparent text-light/80 hover:bg-light/10">
              How it works ↓
            </a>
          </div>
          <p className="mt-5 text-[13px] text-light/60">Follows the State Government of Gujarat guidelines for environment education trips.</p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="wrap flex flex-col items-start gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow">A joint initiative of</p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/img/olympiad/sect-logo.webp" alt="Saurashtra Education & Charitable Trust logo" width={56} height={56} className="h-14 w-14 rounded-full" />
              <div>
                <p className="font-bold leading-tight">{site.trust.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">Rajkot · Reg. {site.trust.registration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Image src="/img/logo.png" alt="Climber Nature Adventure Club logo" width={56} height={56} className="h-14 w-14" />
              <div>
                <p className="font-bold leading-tight">{site.legalName}</p>
                <p className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">Rajkot · since 1997</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[72px] z-20 border-b border-line bg-light/95 backdrop-blur" aria-label="On this page">
        <div className="wrap flex gap-6 overflow-x-auto py-3 font-mono text-[11.5px] uppercase tracking-[.08em] text-muted [scrollbar-width:none]">
          {jumpLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 hover:text-primary">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section className="wrap mt-12">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {o.stats.map(([n, label]) => (
            <div key={label} className="bg-light p-5 sm:p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">{label}</dt>
              <dd>
                <CountUp value={n} className="display mt-1 text-[38px] sm:text-[46px]" />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="dates" className="wrap mt-20 scroll-mt-28">
        <SectionHeader eyebrow="Key dates & fees" title="Mark your calendar" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {o.dates.map((d, i) => (
            <li key={d.label} className="relative rounded-card border border-line p-5">
              <span className="text-[26px]" aria-hidden="true">
                {d.icon}
              </span>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[.08em] text-muted">{d.label}</p>
              <p className="mt-1 text-[18px] font-bold">{d.value}</p>
              {i < 3 && <span className="absolute -right-3 top-1/2 hidden h-px w-6 border-t-2 border-dashed border-line lg:block" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {o.fees.map((f) => (
            <div key={f.who} className="flex items-center gap-4 rounded-card bg-dark p-5 text-light">
              <p className="display text-[40px] text-secondary">₹{f.fee}</p>
              <div>
                <p className="font-bold">{f.who}</p>
                <p className="font-mono text-[11px] uppercase tracking-[.08em] text-light/60">{f.group}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">Non-refundable registration fee · online payment only</p>
      </section>

      <section className="topo mt-24 bg-soft py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="About the Olympiad" title="India’s first adventure scholarship program" />
            <div className="-mt-4 space-y-4 text-[17px] leading-relaxed text-muted">
              {o.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {o.pillars.map(([icon, title, text]) => (
              <div key={title} className="rounded-card border border-line bg-light p-5">
                <span className="text-[28px]" aria-hidden="true">
                  {icon}
                </span>
                <h3 className="mt-3 text-[19px] leading-normal">{title}</h3>
                <p className="mt-1 text-[15px] text-muted">{text}</p>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-card bg-dark p-5 text-light sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[.1em] text-secondary">The prize</p>
              <p className="display mt-1 text-[30px]">Astro Adventure Trekking Camp 2026-27</p>
              <p className="mt-1 text-light/70">Manali · Himachal Pradesh · ₹18,000 camp fee</p>
              <Link href="/trips/astro-adventure-manali" className="mt-4 inline-block font-semibold text-secondary underline">
                See the camp →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="groups" className="wrap mt-24 scroll-mt-28">
        <SectionHeader
          eyebrow="Age groups & fees"
          title="Choose your group"
          intro="Pick the group that matches your age and current standard. A wrong choice means automatic disqualification, with no refund."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {o.groups.map((g) => (
            <article key={g.g} className="flex flex-col rounded-card border border-line p-6">
              <div className="flex items-center justify-between">
                <span className="display flex h-14 w-14 items-center justify-center rounded-card bg-dark text-[34px] text-secondary">{g.g}</span>
                <span className="text-[14px] font-medium text-muted">{g.age}</span>
              </div>
              <h3 className="mt-5 text-[18px] leading-normal">{g.std}</h3>
              <p className="mt-2 text-[15px] text-muted">
                Quiz syllabus: {g.syllabus}
                {g.g !== "D" && " — maths, science, social studies, GK, logical & intellectual questions"}
              </p>
              <div className="mt-auto pt-5">
                <div className="trail-line" />
              </div>
              <p className="mt-4 font-semibold">{g.fee}</p>
            </article>
          ))}
        </div>
        <GroupFinder />
      </section>

      <section id="how" className="wrap mt-24 scroll-mt-28">
        <SectionHeader eyebrow="How it works" title="Your journey to Manali" intro="From registration to the adventure camp in four clear steps." />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {o.steps.map(([icon, title, text], i) => (
            <li key={title} className="rounded-card border border-line p-6">
              <div className="flex items-center justify-between">
                <span className="display text-[44px] leading-none text-primary">0{i + 1}</span>
                <span className="text-[28px]" aria-hidden="true">
                  {icon}
                </span>
              </div>
              <h3 className="mt-4 text-[20px] leading-normal">{title}</h3>
              <p className="mt-2 text-[15px] text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="quiz" className="mt-24 scroll-mt-28 bg-dark py-20 text-light">
        <div className="wrap">
          <SectionHeader dark eyebrow="Quiz details" title="The Eco-STEM online quiz" intro="Multiple choice questions in Gujarati or English, set at your group’s level." />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-card bg-light/10">
                {[
                  ["100", "Questions"],
                  ["100", "Total marks"],
                  ["60", "Minutes"],
                ].map(([n, label]) => (
                  <div key={label} className="bg-dark p-5 text-center">
                    <p className="display text-[44px] text-secondary">{n}</p>
                    <p className="font-mono text-[11px] uppercase tracking-[.08em] text-light/60">{label}</p>
                  </div>
                ))}
              </div>
              <dl className="mt-6 divide-y divide-light/10 border-y border-light/10">
                {o.quiz.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                    <dt className="font-mono text-[11.5px] uppercase tracking-[.08em] text-secondary">{k}</dt>
                    <dd className="text-light/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="eyebrow text-light/60!">🏆 Five rounds of selection</p>
              <ol className="mt-5 border-l-2 border-dashed border-light/20 pl-6">
                {o.rounds.map(([round, title, mode]) => (
                  <li key={round} className="relative pb-6">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary" />
                    <p className="font-mono text-[11.5px] uppercase tracking-[.1em] text-secondary">
                      {round} · {mode}
                    </p>
                    <p className="mt-1 text-[17px] font-semibold">{title}</p>
                  </li>
                ))}
                <li className="relative">
                  <span className="absolute -left-[33px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-dark">★</span>
                  <p className="text-[17px] font-bold text-secondary">{o.roundsResult}</p>
                </li>
              </ol>
              <p className="mt-6 rounded-card bg-light/5 p-4 text-[15px] text-light/75">
                <strong className="text-light">Note:</strong> {o.selectionNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="scholarships" className="wrap mt-24 scroll-mt-28">
        <SectionHeader
          eyebrow="Scholarships"
          title="Dedicated to two Lamps of Nature 🌿"
          intro={`Your scholarship percentage applies to the ₹${o.campFee.toLocaleString("en-IN")} camp fee.`}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {o.scholarships.map((s) => (
            <article key={s.n} className="flex flex-col overflow-hidden rounded-card border border-dark sm:flex-row">
              <div className="relative h-56 shrink-0 bg-soft sm:h-auto sm:w-[200px]">
                <Image src={s.img} alt={s.name.replace(" Adventure Scholarship", "")} fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover object-top" />
                <span className="tag tag-solid absolute left-3 top-3">Scholarship {s.n}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="display text-[44px] leading-none text-primary">{s.pct}</p>
                <h3 className="h-card mt-2">{s.name}</h3>
                <p className="mt-2 text-[15px] text-muted">{s.text}</p>
                <ul className="mt-4 space-y-1.5 text-[15px]">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-success">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={pdfs[s.pdf]} target="_blank" rel="noopener" className="mt-5 self-start font-semibold text-primary underline">
                  {s.pdfLabel} (PDF) →
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 flex gap-3 rounded-card border border-primary bg-primary-soft p-5 text-[15px]">
          <span className="text-[20px]" aria-hidden="true">
            ⚠
          </span>
          <span>
            <strong>Important:</strong> {o.scholarshipRule}
          </span>
        </p>
      </section>

      <section id="included" className="mt-24 scroll-mt-28 bg-soft py-20">
        <div className="wrap">
          <SectionHeader
            eyebrow="What’s included"
            title="The Manali camp experience"
            intro="Astro Adventure Trekking Camp: everything organised by qualified instructors."
            action={{ label: "Camp page", href: "/trips/astro-adventure-manali" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {o.included.map(([icon, title, text]) => (
              <div key={title} className="flex gap-4 rounded-card bg-light p-5">
                <span className="text-[26px]" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <h3 className="text-[18px] leading-normal">{title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-card bg-dark p-6 text-light sm:flex-row sm:items-center">
            <span className="text-[34px]" aria-hidden="true">
              📵
            </span>
            <div>
              <p className="display text-[28px]">Unplug. Explore. Discover.</p>
              <p className="mt-1 text-light/70">
                A digital detox camp: disconnect from screens and reconnect with nature, your friends and yourself. Think original, feel
                original.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="districts" className="wrap mt-24 scroll-mt-28">
        <div className="flex flex-col gap-6 rounded-card border border-dark p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Open for</p>
            <h2 className="display h-section mt-2 [zoom:1]">Every district of Gujarat</h2>
            <p className="mt-2 max-w-xl text-muted">Any eligible student or teacher from anywhere in Gujarat can register.</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {o.regions.map((d) => (
              <li key={d} className="rounded-card bg-soft px-4 py-2.5 font-semibold">
                📍 {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="rules" className="wrap mt-24 scroll-mt-28">
        <SectionHeader eyebrow="Requirements" title="Eligibility & important rules" action={{ label: "Full rules (PDF)", href: o.rulesPdf }} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-line p-6">
            <h3 className="text-[22px] leading-normal">✅ Eligibility</h3>
            <ul className="mt-4 space-y-3">
              {o.eligibility.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="text-success">✓</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card border border-primary p-6">
            <h3 className="text-[22px] leading-normal">⚠ Important rules</h3>
            <ul className="mt-4 space-y-3">
              {o.rules.map((x) => (
                <li key={x} className="flex gap-3">
                  <span className="font-bold text-primary">!</span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="wrap mt-24 max-w-3xl scroll-mt-28">
        <p className="eyebrow">Questions?</p>
        <h2 className="h-section mt-3">Olympiad FAQs</h2>
        <FaqList
          className="mt-6"
          faqs={[
            ...o.faqs.map((f) => ({ question: f.q, answer: f.a })),
            {
              question: "How do I contact the organisers?",
              answer: `Phone / WhatsApp ${contact.phone} · Email ${contact.email} · Office: ${contact.address.full}. Visits by appointment only, so please call first.`,
            },
          ]}
        />
      </section>

      <section className="wrap mt-24">
        <div className="relative overflow-hidden rounded-card bg-dark p-8 text-light sm:p-12">
          <div className="absolute inset-0 opacity-25">
            <Photo img="valley" wide sizes="(min-width: 1240px) 1176px, 100vw" />
          </div>
          <div className="relative">
            <p className="font-mono text-[12px] uppercase tracking-[.14em] text-secondary">⏰ {statusText[status]}</p>
            <h2 className="h-section mt-3 max-w-2xl">Ready for the adventure of a lifetime?</h2>
            <p className="mt-3 max-w-xl text-light/75">Score high on the Eco-STEM quiz and earn your scholarship to Manali.</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {o.fees.map((f) => (
                <span key={f.who}>
                  <span className="display text-[22px] text-secondary">₹{f.fee}</span> <span className="text-[14px] text-light/75">{f.who}</span>
                </span>
              ))}
            </div>
            <a href={cta.href} target="_blank" rel="noopener" className="btn btn-primary mt-8">
              {cta.label}
            </a>
            <p className="mt-4 text-[13px] text-light/55">All disputes subject to Rajkot jurisdiction.</p>
          </div>
        </div>
      </section>
    </>
  );
}
