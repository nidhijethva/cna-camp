/**
 * Loads the approved design content into the CMS: photos, trips, batches, FAQs, reviews,
 * the home page and site settings. Run with `npm run seed`.
 *
 * Fills only what is empty: a collection that already has documents (or a global that has been
 * saved) is skipped entirely, so re-running it never overwrites admin edits or brings back a
 * sample the team deleted. Refuses to touch the live site unless run with `--force`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload, type Payload } from "payload";
import config from "../../payload.config";
import type { Trip as TripDoc } from "../../payload-types";
import { faqs, HOME_FAQ_COUNT } from "./faqs";
import { home, reviews, siteSettings, type SeedPhoto } from "./home";
import { batches, trips, type SeedTrip } from "./trips";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../../public");
const context = { skipRevalidate: true };

const mimeTypes: Record<string, string> = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png" };

const exists = (file: string) =>
  fs.access(file).then(
    () => true,
    () => false,
  );

/** Design key → public path, preferring the larger "-wide" file when there is one. */
async function keyToPath(key: string) {
  const ext = /^(stock|cna)\//.test(key) ? ".webp" : ".jpg";
  const wide = `/img/${key}-wide${ext}`;
  return (await exists(path.join(publicDir, wide))) ? wide : `/img/${key}${ext}`;
}

function createPhotoUploader(payload: Payload) {
  const ids = new Map<string, string>();
  let created = 0;

  async function upload({ src, alt }: SeedPhoto) {
    // "/img/cna/manali/01-wide.webp" → "cna-manali-01"
    const base = src
      .replace(/^\/img\//, "")
      .replace(/-wide(?=\.\w+$)/, "")
      .replace(/\.\w+$/, "")
      .replace(/[^a-z0-9]+/gi, "-");
    const cached = ids.get(base);
    if (cached) return cached;

    // Uploads are stored as WebP (see the Media collection); Payload adds "-1", "-2" when a file
    // with that name is already on disk, so match those too.
    const { docs } = await payload.find({
      collection: "media",
      where: { filename: { in: [`${base}.webp`, ...Array.from({ length: 5 }, (_, n) => `${base}-${n + 1}.webp`)] } },
      limit: 1,
      depth: 0,
    });
    let id = docs[0]?.id;
    if (!id) {
      const ext = path.extname(src).toLowerCase();
      const data = await fs.readFile(path.join(publicDir, src));
      const doc = await payload.create({
        collection: "media",
        data: { alt, ownedByCna: false },
        file: { data, mimetype: mimeTypes[ext], name: `${base}${ext}`, size: data.length },
        context,
      });
      id = doc.id;
      created += 1;
    }
    ids.set(base, id);
    return id;
  }

  return { upload, created: () => created };
}

/** Sequential on purpose: the same photo appears in several places and must be uploaded once. */
async function mapInOrder<T, R>(items: readonly T[], fn: (item: T) => Promise<R>) {
  const out: R[] = [];
  for (const item of items) out.push(await fn(item));
  return out;
}

const tripTypes = { Trek: "trek", Camp: "camp", "Nature Trail": "nature-trail" } as const;

async function tripData(t: SeedTrip, order: number, upload: (p: SeedPhoto) => Promise<string>) {
  const heroImage = await upload({ src: await keyToPath(t.img), alt: t.name });
  const gallery = await mapInOrder([...t.gallery.entries()], async ([i, key]) =>
    upload({ src: await keyToPath(key), alt: `${t.name}, photo ${i + 1}` }),
  );
  return {
    name: t.name,
    slug: t.slug,
    order,
    summary: t.summary,
    region: t.region,
    location: t.state,
    type: tripTypes[t.type],
    difficulty: t.difficulty.toLowerCase() as TripDoc["difficulty"],
    days: t.days,
    nights: t.nights,
    altitudeM: t.altitude ? Number(t.altitude.replace(/\D/g, "")) : null,
    priceFrom: t.price,
    startsFrom: t.start,
    months: t.months.map((m) => m.toLowerCase() as TripDoc["months"][number]),
    activities: t.activities.map((text) => ({ text })),
    campus: t.campus,
    overview: t.overview,
    itinerary: t.plan?.map(([title, body]) => ({ title, body })),
    itineraryConfirmed: t.planIsReal,
    howToReach: t.reach,
    packingList: t.bring?.map((text) => ({ text })),
    heroImage,
    gallery,
    featured: t.featured,
    // Trip details are the design's sample data until CNA confirms them.
    isSample: true,
    _status: "published" as const,
  };
}

/** Noon in India, so the calendar date reads the same in any time zone. */
const indiaNoon = (isoDate: string) => `${isoDate}T06:30:00.000Z`;

const isEmpty = async (payload: Payload, collection: "trips" | "batches" | "faqs" | "reviews") =>
  (await payload.count({ collection })).totalDocs === 0;

async function seed() {
  const isLiveSite = process.env.NODE_ENV === "production" || process.env.SITE_INDEXABLE === "true";
  if (isLiveSite && !process.argv.includes("--force")) {
    throw new Error("Refusing to seed sample content into the live site. Re-run with --force if this is intended.");
  }

  const payload = await getPayload({ config });
  const photos = createPhotoUploader(payload);
  const counts = { trips: 0, batches: 0, faqs: 0, reviews: 0 };

  if (await isEmpty(payload, "trips")) {
    for (const [i, t] of trips.entries()) {
      await payload.create({ collection: "trips", data: await tripData(t, (i + 1) * 10, photos.upload), draft: false, context });
      counts.trips += 1;
    }
  }

  // Batches and reviews link to trips by slug; ones whose trip no longer exists are skipped.
  const { docs: tripDocs } = await payload.find({ collection: "trips", depth: 0, pagination: false, draft: true, select: { slug: true } });
  const tripIds = new Map(tripDocs.map((d) => [d.slug, d.id]));

  if (await isEmpty(payload, "batches")) {
    for (const b of batches) {
      const trip = tripIds.get(b.tripSlug);
      if (!trip) continue;
      await payload.create({
        collection: "batches",
        data: { trip, startDate: indiaNoon(b.startDate), endDate: indiaNoon(b.endDate), seatsLeft: b.seatsLeft, note: b.note, isSample: true },
        context,
      });
      counts.batches += 1;
    }
  }

  if (await isEmpty(payload, "faqs")) {
    for (const [i, f] of faqs.entries()) {
      await payload.create({ collection: "faqs", data: { ...f, order: (i + 1) * 10, showOnHome: i < HOME_FAQ_COUNT }, context });
      counts.faqs += 1;
    }
  }

  if (await isEmpty(payload, "reviews")) {
    for (const { tripSlug, ...r } of reviews) {
      const trip = tripIds.get(tripSlug);
      if (!trip) continue;
      // Placeholders stay visible (and labelled "Sample") until real reviews replace them.
      await payload.create({ collection: "reviews", data: { ...r, trip, consentGiven: true }, context });
      counts.reviews += 1;
    }
  }

  const currentHome = await payload.findGlobal({ slug: "home-page", depth: 0, draft: true });
  const homeSeeded = Boolean(currentHome.hero?.headingLines?.length);
  if (!homeSeeded) {
    const { upload } = photos;
    const { regionImages } = home.destinations;
    await payload.updateGlobal({
      slug: "home-page",
      draft: false,
      context,
      data: {
        _status: "published",
        hero: { ...home.hero, image: await upload(home.hero.image) },
        story: { ...home.story, image: await upload(home.story.image) },
        holidays: {
          ...home.holidays,
          items: await mapInOrder(home.holidays.items, async (h) => ({ ...h, image: await upload(h.image) })),
        },
        destinations: {
          ...home.destinations,
          regionImages: {
            gujarat: await upload(regionImages.gujarat),
            acrossIndia: await upload(regionImages.acrossIndia),
            northEast: await upload(regionImages.northEast),
            outsideIndia: await upload(regionImages.outsideIndia),
          },
        },
        audiences: {
          ...home.audiences,
          items: await mapInOrder(home.audiences.items, async (a) => ({ ...a, image: await upload(a.image) })),
        },
        why: { ...home.why, image: await upload(home.why.image) },
        gallery: {
          ...home.gallery,
          photos: await mapInOrder(home.gallery.photos, async (p) => ({ caption: p.caption, image: await upload(p.image) })),
        },
      },
    });
  }

  const currentSettings = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  const settingsSeeded = Boolean(currentSettings.phone);
  if (!settingsSeeded) {
    await payload.updateGlobal({
      slug: "site-settings",
      context,
      data: { ...siteSettings, social: siteSettings.social.map((s) => ({ ...s })) },
    });
  }

  payload.logger.info(
    `Seed done. Created ${photos.created()} photos, ${counts.trips} trips, ${counts.batches} batches, ` +
      `${counts.faqs} FAQs, ${counts.reviews} reviews; home page ${homeSeeded ? "kept" : "created"}, ` +
      `site settings ${settingsSeeded ? "kept" : "created"}.`,
  );
}

await seed();
process.exit(0);
