import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import { FOUNDED_YEAR } from "@/content/site";
import type { HomeContent } from "@/lib/content";

export function StorySection({ content }: { content: HomeContent["story"] }) {
  return (
    <section className="wrap mt-24 grid items-center gap-12 lg:grid-cols-2" aria-labelledby="story-title">
      <div className="reveal relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Photo
            img={content.image}
            sizes="(min-width: 1024px) 590px, 100vw"
          />
        </div>
        <div className="absolute -bottom-6 right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-light bg-primary text-center text-light shadow-float sm:-right-6 sm:h-36 sm:w-36">
          <span className="font-mono text-[11px] uppercase tracking-[.14em]">Since</span>
          <span className="display text-[40px] leading-none">{FOUNDED_YEAR}</span>
        </div>
      </div>

      <div className="reveal">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="story-title" className="h-section mt-3">
          {content.title}
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">{content.body}</p>
        <ul className="mt-8 space-y-5">
          {content.points.map((p) => (
            <li key={p.title} className="flex gap-4">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dark text-[13px] text-light"
                aria-hidden="true"
              >
                ✓
              </span>
              <div>
                <h3 className="text-[18px] leading-normal">{p.title}</h3>
                <p className="mt-0.5 text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/about" className="btn btn-dark mt-9">
          About us →
        </Link>
      </div>
    </section>
  );
}
