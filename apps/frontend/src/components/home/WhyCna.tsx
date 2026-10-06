import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import type { HomeContent } from "@/lib/content";

export function WhyCna({ content }: { content: HomeContent["why"] }) {
  return (
    <section className="mt-24 bg-dark text-light" aria-labelledby="why-title">
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-card">
          <Photo
            img={content.image}
            sizes="(min-width: 1024px) 590px, 100vw"
          />
          {content.imageLabel && <span className="tag tag-solid absolute bottom-4 left-4 border-light/30">{content.imageLabel}</span>}
        </div>
        <div className="reveal">
          <p className="eyebrow text-light/60!">{content.eyebrow}</p>
          <h2 id="why-title" className="h-section mt-3">
            {content.title}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {content.points.map((w) => (
              <li key={w.title} className="border-t border-light/15 pt-4">
                <h3 className="text-[18px] leading-normal">{w.title}</h3>
                <p className="mt-1 text-[15px] text-light/70">{w.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/about" className="btn btn-primary mt-10">
            Our story →
          </Link>
        </div>
      </div>
    </section>
  );
}
