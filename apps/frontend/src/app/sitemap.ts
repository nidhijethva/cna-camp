import type { MetadataRoute } from "next";
import { getPosts, getTrips } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

const pages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/trips", priority: 0.9, changeFrequency: "weekly" },
  { path: "/batches", priority: 0.9, changeFrequency: "daily" },
  { path: "/olympiad", priority: 0.8, changeFrequency: "weekly" },
  { path: "/group-trips", priority: 0.8, changeFrequency: "monthly" },
  { path: "/travellers", priority: 0.7, changeFrequency: "monthly" },
  { path: "/destinations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cancellation", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/photo-credits", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trips, posts] = await Promise.all([getTrips(), getPosts()]);
  const lastModified = new Date();
  return [
    ...pages,
    ...trips.map((t): Entry => ({ path: `/trips/${t.slug}`, priority: 0.8, changeFrequency: "monthly" })),
    ...posts.map((p): Entry => ({ path: `/blog/${p.slug}`, priority: 0.6, changeFrequency: "yearly" })),
  ].map((e) => ({ url: absoluteUrl(e.path), lastModified, changeFrequency: e.changeFrequency, priority: e.priority }));
}
