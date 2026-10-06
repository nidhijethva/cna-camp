import "server-only";
import { cache } from "react";
import { regionOrder } from "@/content/site";
import { todayInIndia } from "@/lib/format";
import { getCms } from "@/lib/payload";
import type { HomePage as HomeDoc, Media, Post as PostDoc, SiteSetting, Trip as TripDoc } from "@/payload-types";
import type {
  Audience,
  Batch,
  Difficulty,
  Faq,
  GalleryPhoto,
  HolidayGroup,
  ImageRef,
  Month,
  RegionSlug,
  Review,
  Seo,
  Trip,
  TripType,
} from "@/types/content";

/* Every loader is wrapped in React `cache`, so a page and its layout share one query per request. */

/** Payload prefixes uploads with the server URL; files on this site are served by path instead. */
const mediaPath = (url: string) => url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/)/, "");

function toImage(media: string | Media | null | undefined): ImageRef | null {
  if (!media || typeof media === "string" || !media.url) return null;
  return {
    src: mediaPath(media.url),
    alt: media.alt,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    focalX: media.focalX ?? undefined,
    focalY: media.focalY ?? undefined,
  };
}

const images = (list: (string | Media)[] | null | undefined) => (list ?? []).flatMap((m) => toImage(m) ?? []);
const texts = (list: { text: string }[] | null | undefined) => (list?.length ? list.map((x) => x.text) : null);
const capitalise = <T extends string>(value: string) => (value[0].toUpperCase() + value.slice(1)) as T;

const tripTypes: Record<TripDoc["type"], TripType> = { trek: "Trek", camp: "Camp", "nature-trail": "Nature Trail" };

const toSeo = (seo: { title?: string | null; description?: string | null; image?: string | Media | null } | undefined): Seo => ({
  title: seo?.title || null,
  description: seo?.description || null,
  image: toImage(seo?.image),
});

function toTrip(doc: TripDoc): Trip {
  return {
    slug: doc.slug,
    name: doc.name,
    region: doc.region,
    state: doc.location,
    type: tripTypes[doc.type],
    days: doc.days,
    nights: doc.nights,
    altitude: doc.altitudeM ? `${doc.altitudeM.toLocaleString("en-IN")} m` : null,
    difficulty: capitalise<Difficulty>(doc.difficulty),
    price: doc.priceFrom ?? null,
    img: toImage(doc.heroImage),
    gallery: images(doc.gallery),
    months: doc.months.map((m) => capitalise<Month>(m)),
    start: doc.startsFrom,
    activities: texts(doc.activities) ?? [],
    campus: doc.campus ?? null,
    featured: Boolean(doc.featured),
    summary: doc.summary,
    overview: doc.overview || null,
    bring: texts(doc.packingList),
    plan: doc.itinerary?.length ? doc.itinerary.map((d) => [d.title, d.body ?? ""] as [string, string]) : null,
    planIsReal: Boolean(doc.itineraryConfirmed),
    reach: doc.howToReach || null,
    included: texts(doc.included),
    notIncluded: texts(doc.notIncluded),
    faqs: doc.faqs?.length ? doc.faqs.map(({ question, answer }) => ({ question, answer })) : null,
    isSample: Boolean(doc.isSample),
    seo: toSeo(doc.seo),
  };
}

/** Published trips only, in the editors' chosen order. */
const getTripDocs = cache(async () => {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "trips",
    where: { _status: { equals: "published" } },
    sort: ["order", "name"],
    depth: 1,
    pagination: false,
  });
  return docs;
});

export const getTrips = cache(async () => (await getTripDocs()).map(toTrip));

export async function getTrip(slug: string): Promise<Trip | undefined> {
  return (await getTrips()).find((t) => t.slug === slug);
}

export async function getFeaturedTrips() {
  return (await getTrips()).filter((t) => t.featured);
}

export async function getRegionTripCounts(): Promise<Record<RegionSlug, number>> {
  const counts = Object.fromEntries(regionOrder.map((r) => [r, 0])) as Record<RegionSlug, number>;
  for (const t of await getTrips()) counts[t.region] += 1;
  return counts;
}

export interface UpcomingBatch extends Batch {
  trip: Trip;
}

/** Calendar date in India, so a batch picked as "17 Oct" in the admin never shifts a day. */
const indiaDate = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

const getBatches = cache(async (): Promise<UpcomingBatch[]> => {
  const payload = await getCms();
  const [{ docs }, tripDocs, trips] = await Promise.all([
    payload.find({ collection: "batches", sort: "startDate", depth: 0, pagination: false }),
    getTripDocs(),
    getTrips(),
  ]);
  const today = todayInIndia();
  return docs.flatMap((b) => {
    const index = tripDocs.findIndex((d) => d.id === b.trip);
    const endDate = indiaDate(b.endDate);
    if (index === -1 || endDate < today) return [];
    const trip = trips[index];
    return [{ tripSlug: trip.slug, startDate: indiaDate(b.startDate), endDate, seatsLeft: b.seatsLeft, note: b.note ?? undefined, trip }];
  });
});

export async function getUpcomingBatches(limit?: number) {
  const batches = await getBatches();
  return limit ? batches.slice(0, limit) : batches;
}

export async function getTripBatches(slug: string) {
  return (await getBatches()).filter((b) => b.tripSlug === slug);
}

export async function getSimilarTrips(trip: Trip) {
  const trips = await getTrips();
  return [
    ...trips.filter((x) => x.region === trip.region && x.type === trip.type && x.slug !== trip.slug),
    ...trips.filter((x) => x.region === trip.region && x.type !== trip.type),
  ].slice(0, 3);
}

export const getFaqs = cache(async (): Promise<(Faq & { showOnHome: boolean })[]> => {
  const payload = await getCms();
  const { docs } = await payload.find({ collection: "faqs", sort: ["order", "createdAt"], depth: 0, pagination: false });
  return docs.map((f) => ({ question: f.question, answer: f.answer, showOnHome: Boolean(f.showOnHome) }));
});

export async function getHomeFaqs(): Promise<Faq[]> {
  return (await getFaqs()).filter((f) => f.showOnHome);
}

export const getReviews = cache(async (limit = 3): Promise<Review[]> => {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "reviews",
    where: { consentGiven: { equals: true } },
    sort: "-createdAt",
    depth: 1,
    limit,
  });
  return docs.map((r) => ({
    name: r.name,
    role: r.role,
    quote: r.quote,
    rating: r.rating,
    tripName: typeof r.trip === "object" ? r.trip.name : "",
    isSample: Boolean(r.isSample),
  }));
});

export const whatsappLink = (number: string, message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export interface SiteSettings {
  phone: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  email: string;
  trustEmail: string | null;
  mapHref: string | null;
  address: { full: string; street: string; locality: string; region: string; postalCode: string; country: "IN" };
  social: { label: string; href: string | null }[];
  stats: { campers: string; camps: string };
}

/**
 * Tolerates an unsaved global (fresh database): the header and footer call this on every page,
 * so a missing field must degrade to empty text rather than take the whole site down.
 */
function toSiteSettings(doc: Partial<SiteSetting>): SiteSettings {
  const { street = "", city = "", state = "", postalCode = "" } = doc.address ?? {};
  const phone = doc.phone ?? "";
  const whatsappNumber = doc.whatsappNumber ?? "";
  return {
    phone,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
    whatsappNumber,
    whatsappHref: whatsappLink(whatsappNumber, doc.whatsappMessage ?? ""),
    email: doc.email ?? "",
    trustEmail: doc.trustEmail || null,
    mapHref: doc.mapUrl || null,
    address: {
      full: [street, [city, postalCode].filter(Boolean).join(" "), state].filter(Boolean).join(", "),
      street,
      locality: city,
      region: state,
      postalCode,
      country: "IN",
    },
    social: (doc.social ?? []).map((s) => ({ label: s.platform, href: s.url || null })),
    stats: { campers: doc.campersCount ?? "", camps: doc.campsCount ?? "" },
  };
}

export const getSiteSettings = cache(async () => {
  const payload = await getCms();
  return toSiteSettings(await payload.findGlobal({ slug: "site-settings", depth: 0 }));
});

const heading = (s: { eyebrow?: string | null; title?: string | null; intro?: string | null } = {}) => ({
  eyebrow: s.eyebrow ?? "",
  title: s.title ?? "",
  intro: s.intro || null,
});

const points = (list: { title: string; text: string }[] | null | undefined) => (list ?? []).map(({ title, text }) => ({ title, text }));

/**
 * Every section is optional at runtime (an unsaved global comes back as empty objects), and a photo
 * deleted from the library leaves only its id, which maps to null and shows "Photo coming soon".
 */
function toHome(doc: Partial<HomeDoc>) {
  const { hero, story, holidays, destinations, audiences, why, gallery } = doc;
  const regions = destinations?.regionImages;
  const regionImages: Record<RegionSlug, ImageRef | null> = {
    gujarat: toImage(regions?.gujarat),
    "across-india": toImage(regions?.acrossIndia),
    "north-east": toImage(regions?.northEast),
    "outside-india": toImage(regions?.outsideIndia),
  };
  return {
    hero: {
      headingLines: hero?.headingLines ?? [],
      intro: hero?.intro ?? "",
      image: toImage(hero?.image),
      highlights: hero?.highlights ?? [],
    },
    story: { ...heading(story), body: story?.body ?? "", image: toImage(story?.image), points: points(story?.points) },
    holidays: {
      ...heading(holidays),
      items: (holidays?.items ?? []).map(
        (h): HolidayGroup => ({
          key: h.id ?? h.title,
          months: h.months,
          title: h.title,
          highlights: h.highlights ?? [],
          tripCount: h.tripCount,
          href: h.link,
          image: toImage(h.image),
        }),
      ),
    },
    destinations: { ...heading(destinations), regionImages },
    audiences: {
      ...heading(audiences),
      items: (audiences?.items ?? []).map(
        (a): Audience => ({ title: a.title, description: a.description, href: a.link, image: toImage(a.image) }),
      ),
      teacherNote: audiences?.teacherNote || null,
    },
    why: { ...heading(why), image: toImage(why?.image), imageLabel: why?.imageLabel || null, points: points(why?.points) },
    gallery: {
      ...heading(gallery),
      // The strip and the masonry gallery need a real photo for every frame.
      photos: (gallery?.photos ?? []).flatMap((p): GalleryPhoto[] => {
        const image = toImage(p.image);
        return image ? [{ image, caption: p.caption }] : [];
      }),
    },
    seo: toSeo(doc.seo),
  };
}

export type HomeContent = ReturnType<typeof toHome>;

/** Published version only; drafts saved in the admin stay off the site until published. */
export const getHome = cache(async () => {
  const payload = await getCms();
  return toHome(await payload.findGlobal({ slug: "home-page", depth: 1, draft: false }));
});

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  cover: ImageRef | null;
  publishedAt: string;
}

const toPostSummary = (p: PostDoc): PostSummary => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  cover: toImage(p.coverImage),
  publishedAt: p.publishedAt ?? p.createdAt,
});

export const getPosts = cache(async (): Promise<PostSummary[]> => {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "posts",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
    pagination: false,
  });
  return docs.map(toPostSummary);
});

export const getPost = cache(async (slug: string) => {
  const payload = await getCms();
  const { docs } = await payload.find({
    collection: "posts",
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
    depth: 2,
    limit: 1,
  });
  const post = docs[0];
  if (!post) return undefined;
  const relatedTrips = (post.relatedTrips ?? []).flatMap((t) => (typeof t === "object" && t._status === "published" ? [toTrip(t)] : []));
  return { ...toPostSummary(post), content: post.content, seo: toSeo(post.seo), relatedTrips };
});
