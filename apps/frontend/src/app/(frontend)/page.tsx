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
import { homeFaqs } from "@/content/home";
import { site } from "@/content/site";
import { getPopularTrips, getRegionTripCounts, getTripIndex, getUpcomingBatches } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

// Re-render hourly so past batches drop off the list.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.shortTagline}` },
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [popular, batches, tripIndex, regionCounts] = await Promise.all([
    getPopularTrips(),
    getUpcomingBatches(5),
    getTripIndex(),
    getRegionTripCounts(),
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
      <Hero />
      <TripSearch />
      <StorySection />
      <UpcomingBatches batches={batches} />
      <PopularTrips trips={popular} />
      <HolidayGrid />
      <JourneyStats tripCount={tripIndex.length} />
      <Destinations counts={regionCounts} />
      <OlympiadBanner />
      <Audiences />
      <WhyCna />
      <Reviews />
      <Filmstrip />
      <FaqEnquiry faqs={homeFaqs} trips={tripIndex.map(({ slug, name }) => ({ slug, name }))} />
      <JsonLd data={websiteLd} />
      <JsonLd data={popularLd} />
    </>
  );
}
