import type { Metadata } from "next";
import { Audiences } from "@/components/home/Audiences";
import { Destinations } from "@/components/home/Destinations";
import { FaqEnquiry } from "@/components/home/FaqEnquiry";
import { Filmstrip } from "@/components/home/Filmstrip";
import { Hero } from "@/components/home/Hero";
import { HolidayGrid } from "@/components/home/HolidayGrid";
import { JourneyStats } from "@/components/home/JourneyStats";
import { OlympiadBanner } from "@/components/home/OlympiadBanner";
import { PopularTrips } from "@/components/home/PopularTrips";
import { Reviews } from "@/components/home/Reviews";
import { StorySection } from "@/components/home/StorySection";
import { TripSearch } from "@/components/home/TripSearch";
import { UpcomingBatches } from "@/components/home/UpcomingBatches";
import { WhyCna } from "@/components/home/WhyCna";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import {
  getFeaturedTrips,
  getHome,
  getHomeFaqs,
  getRegionTripCounts,
  getReviews,
  getSiteSettings,
  getTrips,
  getUpcomingBatches,
} from "@/lib/content";
import { photoSrc } from "@/lib/photos";
import { absoluteUrl } from "@/lib/seo";

// Re-render hourly so past batches drop off the list.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome();
  return {
    title: { absolute: seo.title ?? `${site.name} | ${site.shortTagline}` },
    description: seo.description ?? undefined,
    alternates: { canonical: "/" },
    openGraph: seo.image ? { images: [{ url: photoSrc(seo.image), alt: seo.image.alt }] } : undefined,
  };
}

export default async function HomePage() {
  const [home, popular, batches, allTrips, regionCounts, faqs, reviews, settings] = await Promise.all([
    getHome(),
    getFeaturedTrips(),
    getUpcomingBatches(5),
    getTrips(),
    getRegionTripCounts(),
    getHomeFaqs(),
    getReviews(),
    getSiteSettings(),
  ]);

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
  };

  const popularLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Popular CNA trips",
    itemListElement: popular.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/trips/${t.slug}`),
      name: t.name,
    })),
  };

  return (
    <>
      <Hero content={home.hero} />
      <TripSearch />
      <StorySection content={home.story} />
      <UpcomingBatches batches={batches} />
      <PopularTrips trips={popular} />
      <HolidayGrid content={home.holidays} />
      <JourneyStats tripCount={allTrips.length} counts={settings.stats} />
      <Destinations content={home.destinations} counts={regionCounts} />
      <OlympiadBanner />
      <Audiences content={home.audiences} />
      <WhyCna content={home.why} />
      <Reviews reviews={reviews} />
      <Filmstrip content={home.gallery} />
      <FaqEnquiry faqs={faqs} />
      <JsonLd data={websiteLd} />
      <JsonLd data={popularLd} />
    </>
  );
}
