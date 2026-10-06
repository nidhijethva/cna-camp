import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHead } from "@/components/layout/PageHead";
import { Lightbox } from "@/components/media/Lightbox";
import { Photo } from "@/components/media/Photo";
import { PlayIcon } from "@/components/ui/icons";
import { regionOrder, regions } from "@/content/site";
import { getHome, getTrips } from "@/lib/content";
import { photoSrc } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from CNA camps and treks: campfires, rafting, climbing, beaches, forests and the Himalaya. Since 1997.",
  alternates: { canonical: "/gallery" },
};

const videos = [
  { img: "cna/manali/03", alt: "CNA campfire", label: "CNA in 60 seconds" },
  { img: "cna/marinecamp/03", alt: "Marine camp reef", label: "Marine Camp, Bet Dwarka" },
  { img: "cna/manali/09", alt: "Rafting on the Beas", label: "Rafting & climbing, Manali" },
];

export default async function GalleryPage() {
  const [trips, home] = await Promise.all([getTrips(), getHome()]);
  const albums = trips
    .filter((t) => t.gallery.length >= 3)
    .map((t) => ({ trip: t, photos: [...(t.img ? [t.img] : []), ...t.gallery.filter((g) => g.src !== t.img?.src)].slice(0, 8) }));
  const albumRegions = regionOrder.filter((r) => albums.some((a) => a.trip.region === r));
  const moments = home.gallery.photos;

  return (
    <>
      <PageHead
        img="cna/manali/05"
        eyebrow="Gallery"
        title="Moments from the trail"
        text="Campfires, river crossings, reef walks and summit mornings. Tap any photo to see it big."
      />

      <Lightbox>
        <section className="wrap mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Our people</p>
              <h2 className="h-section mt-2">CNA moments</h2>
            </div>
            <p className="max-w-md text-muted">Real groups on real CNA camps. Send us yours and we add them here.</p>
          </div>
          <div className="gal mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
            {moments.map((m) => (
              <button
                key={m.image.src}
                type="button"
                data-full={m.image.src}
                data-caption={m.caption}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-card bg-soft"
                aria-label={`Open photo: ${m.caption}`}
              >
                <Image
                  src={m.image.src}
                  alt={m.caption}
                  width={m.image.width ?? 800}
                  height={m.image.height ?? 600}
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-dark/75 p-3 pt-8 text-left font-mono text-[11px] uppercase tracking-[.08em] text-light opacity-0 transition group-hover:opacity-100">
                  {m.caption}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="wrap mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Watch</p>
              <h2 className="h-section mt-2">Videos</h2>
            </div>
            <p className="max-w-md text-muted">Short clips from our camps are coming soon.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {videos.map((v) => (
              <div
                key={v.label}
                className="group relative aspect-video overflow-hidden rounded-card"
                role="img"
                aria-label={`${v.alt}. Video coming soon: ${v.label}`}
              >
                <Photo img={v.img} sizes="(min-width: 768px) 400px, 100vw" className="transition duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-linear-to-b from-dark/10 to-dark/65" />
                <span
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-light shadow-float transition group-hover:scale-110"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden" />
                  <PlayIcon className="relative ml-1" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-light">
                  <span className="text-[13px] font-medium uppercase tracking-[.08em] text-light/85">Video coming soon</span>
                  <p className="mt-2 text-[15px] font-semibold">{v.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap mt-20">
          <div>
            <p className="eyebrow">Albums</p>
            <h2 className="h-section mt-2">By trip</h2>
          </div>
          <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Albums by region">
            {albumRegions.map((r) => (
              <a key={r} href={`#${r}`} className="font-semibold underline-offset-4 hover:text-primary hover:underline">
                {regions[r].label}
              </a>
            ))}
          </nav>
          {albumRegions.map((r) => (
            <div key={r} id={r} className="mt-12 scroll-mt-28">
              <p className="display text-[30px]">{regions[r].label}</p>
              <div className="mt-5 grid gap-8 lg:grid-cols-2">
                {albums
                  .filter((a) => a.trip.region === r)
                  .map(({ trip, photos }) => (
                    <article key={trip.slug}>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="h-card">{trip.name}</h3>
                        <Link href={`/trips/${trip.slug}`} className="shrink-0 text-[14px] font-semibold text-primary underline">
                          View trip →
                        </Link>
                      </div>
                      <div className="gal mt-3 grid grid-cols-4 gap-2">
                        {photos.map((p, i) => (
                          <button
                            key={p.src}
                            type="button"
                            data-full={photoSrc(p)}
                            data-caption={trip.name}
                            className={`group relative aspect-square overflow-hidden rounded-tag bg-soft ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                            aria-label={`Open ${trip.name} photo ${i + 1}`}
                          >
                            <Photo
                              img={p}
                              alt={`${trip.name}, photo ${i + 1}`}
                              sizes={i === 0 ? "(min-width: 1024px) 290px, 50vw" : "(min-width: 1024px) 145px, 25vw"}
                              className="transition duration-500 group-hover:scale-[1.06]"
                            />
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          ))}
          <p className="mt-12 rounded-card bg-soft p-5 text-[14px] text-muted">
            Some destination photos are placeholders from our old website and will be replaced with CNA’s own trip photos.
          </p>
        </section>
      </Lightbox>
    </>
  );
}
