import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { Lightbox } from "@/components/media/Lightbox";
import { Photo } from "@/components/media/Photo";
import { BreadcrumbLd } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { TripCard } from "@/components/trips/TripCard";
import { FaqList } from "@/components/ui/FaqList";
import { MetaLine } from "@/components/ui/MetaLine";
import { regions, site, tripsByRegionHref } from "@/content/site";
import { getSimilarTrips, getSiteSettings, getTrip, getTripBatches, getTrips } from "@/lib/content";
import { photoSrc } from "@/lib/photos";
import { absoluteUrl } from "@/lib/seo";
import {
  durationShort,
  tripCampus,
  tripDescription,
  tripFacts,
  tripFaqs,
  tripGallery,
  tripIncluded,
  tripItinerary,
  tripNotIncluded,
  tripPackingList,
  tripPrice,
  tripReach,
  tripTypeLine,
  tripWhoCanJoin,
} from "@/lib/trips";

// Re-render hourly so past batches drop off the list.
export const revalidate = 3600;

// Trips published later in the admin render on first visit, then stay cached.
export async function generateStaticParams() {
  return (await getTrips()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[slug]">): Promise<Metadata> {
  const trip = await getTrip((await params).slug);
  if (!trip) return {};
  const path = `/trips/${trip.slug}`;
  const image = trip.seo.image ?? trip.img;
  return {
    title: trip.seo.title ?? trip.name,
    description: tripDescription(trip),
    alternates: { canonical: path },
    openGraph: { url: path, title: trip.seo.title ?? trip.name, images: image ? [{ url: photoSrc(image), alt: image.alt || trip.name }] : undefined },
  };
}

const batchDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export default async function TripPage({ params }: PageProps<"/trips/[slug]">) {
  const trip = await getTrip((await params).slug);
  if (!trip) notFound();

  const region = regions[trip.region].label;
  const gallery = tripGallery(trip);
  const showPhotos = gallery.length >= 3;
  const campus = tripCampus(trip);
  const [batches, similar, contact] = await Promise.all([getTripBatches(trip.slug), getSimilarTrips(trip), getSiteSettings()]);
  const days = tripItinerary(trip);

  const jumpLinks = [
    ["overview", "Overview"],
    ...(showPhotos ? [["photos", "Photos"]] : []),
    ["itinerary", "Day by day"],
    ["inclusions", "Inclusions"],
    ["carry", "What to carry"],
    ["reach", "How to reach"],
    ["faq", "FAQs"],
    ["enquire", "Enquire"],
  ];

  const tripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.name,
    description: trip.summary,
    url: absoluteUrl(`/trips/${trip.slug}`),
    image: trip.img ? absoluteUrl(photoSrc(trip.img)) : undefined,
    touristType: ["Students", "Families", "Groups", "Solo travellers"],
    provider: { "@id": absoluteUrl("/#organization") },
    itinerary: {
      "@type": "ItemList",
      itemListElement: days.map((d, i) => ({ "@type": "ListItem", position: i + 1, name: `Day ${i + 1}: ${d.title}` })),
    },
    ...(trip.price && {
      offers: { "@type": "Offer", price: trip.price, priceCurrency: "INR", availability: "https://schema.org/InStock" },
    }),
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div className="kenburns absolute inset-0 -z-10 overflow-hidden opacity-90">
          <Photo img={trip.img} wide preload sizes="100vw" alt={trip.name} label={`${region} photo coming soon`} />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-dark/20 to-dark/88" />
        <div className="wrap flex min-h-[460px] flex-col justify-end pb-12 pt-20">
          <nav className="font-mono text-[11.5px] uppercase tracking-[.08em] text-light/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-light">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/trips" className="hover:text-light">
              Trips
            </Link>{" "}
            /{" "}
            <Link href={tripsByRegionHref(trip.region)} className="hover:text-light">
              {region}
            </Link>
          </nav>
          <h1 className="h-page mt-4 max-w-4xl">{trip.name}</h1>
          <p className="mt-4 max-w-2xl text-[18px] text-light/85">{trip.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="tag border-secondary bg-secondary text-dark">{trip.type}</span>
            <MetaLine items={[durationShort(trip), trip.state, trip.altitude, trip.difficulty]} className="text-[15px] text-light/85" />
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

      <div className="wrap mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <section>
            <p className="eyebrow">Quick facts</p>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
              {tripFacts(trip).map(([k, v]) => (
                <div key={k} className="bg-light p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">{k}</dt>
                  <dd className="mt-1 font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="overview" className="mt-14 scroll-mt-32">
            <h2 className="h-sub">Overview</h2>
            <p className="lead mt-4">
              {trip.overview ?? trip.summary} {tripTypeLine[trip.type]}
            </p>
            <p className="lead mt-3">
              Like every CNA trip, it is run by a nature club backed by {site.trust.name}, on a no-profit-no-loss model.
              Small groups, trained leaders, leave-no-trace.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-card bg-soft p-6">
                <p className="eyebrow">Highlights</p>
                <ul className="mt-4 space-y-2">
                  {trip.activities.map((a) => (
                    <li key={a} className="flex gap-3">
                      <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-card border border-line p-6">
                <p className="eyebrow">Who can join</p>
                <dl className="mt-4 space-y-2 text-[15px]">
                  {tripWhoCanJoin(trip).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-dashed border-line pb-2 last:border-0">
                      <dt className="font-semibold">{k}</dt>
                      <dd className="text-right text-muted">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {campus && (
            <section className="mt-14 overflow-hidden rounded-card border border-line">
              <div className="grid sm:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/3] sm:aspect-auto">
                  <Photo img={campus.img} alt={`${campus.name}, ${campus.place}`} sizes="(min-width: 640px) 220px, 100vw" />
                </div>
                <div className="p-6">
                  <p className="eyebrow">Where you stay</p>
                  <h2 className="h-sub mt-2">{campus.name}</h2>
                  <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">
                    {campus.place} · {campus.own}
                  </p>
                  <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
                    <div>
                      <dt className="font-bold">Stay</dt>
                      <dd className="text-muted">
                        {campus.stay}
                        {campus.capacity && ` · up to ${campus.capacity}`}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-bold">Best season</dt>
                      <dd className="text-muted">{campus.months}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="font-bold">Facilities</dt>
                      <dd className="text-muted">{campus.facilities.join(" · ")}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          )}

          <section className="mt-14 flex flex-col gap-5 rounded-card bg-dark p-6 text-light sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-4">
              <span className="text-[30px]" aria-hidden="true">
                🏫
              </span>
              <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[.12em] text-secondary">For schools</p>
                <p className="mt-1 text-[19px] font-bold">Bring your school on this trip</p>
                <p className="mt-1 text-light/70">
                  Minimum 50 students. <strong className="text-light">1 teacher or escort travels free with every 25 students.</strong>
                </p>
              </div>
            </div>
            <Link href="/group-trips#schools" className="btn btn-primary shrink-0">
              Plan a school trip →
            </Link>
          </section>

          {showPhotos && (
            <section id="photos" className="mt-14 scroll-mt-32">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="h-sub">Photos</h2>
                <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{gallery.length} photos · tap to open</span>
              </div>
              <Lightbox>
                <div className="gal mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((g, i) => (
                    <button
                      key={g.src}
                      type="button"
                      data-full={photoSrc(g)}
                      className={`group relative overflow-hidden rounded-card bg-soft ${
                        i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-[4/3]"
                      }`}
                      aria-label={`Open photo ${i + 1} of ${trip.name}`}
                    >
                      <Photo
                        img={g}
                        sizes={i === 0 ? "(min-width: 1024px) 520px, 100vw" : "(min-width: 1024px) 260px, 50vw"}
                        className="transition duration-500 group-hover:scale-[1.05]"
                      />
                    </button>
                  ))}
                </div>
              </Lightbox>
            </section>
          )}

          <section id="itinerary" className="mt-14 scroll-mt-32">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="h-sub">Day by day</h2>
              <p className="text-[14px] text-muted">
                {trip.planIsReal ? "Final plan shared on booking" : "Sample itinerary · final plan on enquiry"}
              </p>
            </div>
            <ol className="mt-6 border-l-2 border-dashed border-line pl-6">
              {days.map((d, i) => (
                <li key={i} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[37px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-dark font-mono text-[11px] text-light">
                    {i + 1}
                  </span>
                  <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-primary">Day {i + 1}</p>
                  <p className="mt-1 text-[19px] font-bold">{d.title}</p>
                  <p className="mt-1 text-muted">{d.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="inclusions" className="mt-14 grid scroll-mt-32 gap-6 md:grid-cols-2">
            <div className="rounded-card border border-line p-6">
              <h3 className="h-card">Included</h3>
              <ul className="mt-4 space-y-2">
                {tripIncluded(trip).map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="text-success">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-line p-6">
              <h3 className="h-card">Not included</h3>
              <ul className="mt-4 space-y-2">
                {tripNotIncluded(trip).map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="text-primary">✕</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted md:col-span-2">
              Typical list · final inclusions confirmed at booking
            </p>
          </section>

          <section id="carry" className="mt-14 scroll-mt-32">
            <h2 className="h-sub">What to carry</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {tripPackingList(trip).map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="text-primary">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section id="reach" className="mt-14 scroll-mt-32">
            <h2 className="h-sub">How to reach</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">{tripReach(trip)}</p>
          </section>

          <section className="mt-14 rounded-card bg-soft p-6">
            <h2 className="h-sub">Booking &amp; cancellation</h2>
            <p className="mt-3 text-muted">
              Pay 25% advance to book. Balance 3 days before departure. Cancellation charges: 10% (2 months before), 15% (1
              month), 25% (1 week), 50% (2 days), 100% (same day).{" "}
              <Link href="/cancellation" className="font-semibold text-dark underline">
                Full policy
              </Link>{" "}
              ·{" "}
              <Link href="/terms" className="font-semibold text-dark underline">
                Terms
              </Link>
            </p>
          </section>

          <section id="faq" className="mt-14 scroll-mt-32">
            <h2 className="h-sub">Trip FAQs</h2>
            <FaqList faqs={tripFaqs(trip)} className="mt-4" />
          </section>

          {similar.length > 0 && (
            <section className="mt-16">
              <h2 className="h-sub">Similar trips</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {similar.map((s) => (
                  <TripCard key={s.slug} trip={s} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-card border border-dark p-6">
            <p className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">{trip.price ? "Starts from" : "Price"}</p>
            <p className="display mt-1 text-[36px]">{tripPrice(trip)}</p>
            <p className="text-[14px] text-muted">{trip.price ? "per person" : "Depends on group size and dates"}</p>
            <div className="trail-line my-5" />
            <p className="eyebrow">Next batches</p>
            {batches.length ? (
              <ul className="mt-3 space-y-2">
                {batches.map((b) => (
                  <li key={b.startDate} className="flex items-center justify-between rounded-tag bg-soft px-3 py-2">
                    <span className="font-semibold">{batchDate(b.startDate)}</span>
                    <span className="font-mono text-[12px] text-primary">{b.seatsLeft} seats</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[15px] text-muted">Dates on request. Groups can choose their own dates.</p>
            )}
            <a href="#enquire" className="btn btn-primary mt-6 w-full">
              Enquire / book →
            </a>
            <a href={contact.whatsappHref} target="_blank" rel="noopener" className="btn btn-outline mt-3 w-full">
              WhatsApp us
            </a>
            <Link href="/group-trips#custom" className="mt-4 block text-center text-[14px] font-semibold text-muted underline hover:text-primary">
              Plan this for your group
            </Link>
          </div>
        </aside>
      </div>

      <section id="enquire" className="wrap mt-20 scroll-mt-28">
        <EnquiryForm
          variant="trip"
          defaultTrip={trip.slug}
          title={`Ask about ${trip.name}`}
        />
      </section>

      <JsonLd data={tripLd} />
      <BreadcrumbLd
        items={[
          { name: "Home", path: "/" },
          { name: "Trips", path: "/trips" },
          { name: trip.name, path: `/trips/${trip.slug}` },
        ]}
      />
    </>
  );
}
