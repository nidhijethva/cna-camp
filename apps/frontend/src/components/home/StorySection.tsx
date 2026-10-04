import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "@/components/ui/icons";
import { storyPoints } from "@/content/home";
import { FOUNDED_YEAR, yearsActive } from "@/content/site";

export function StorySection() {
  return (
    <section className="wrap mt-24 grid items-center gap-12 lg:grid-cols-2" aria-labelledby="story-title">
      <div id="story" className="reveal relative">
        <div
          className="group relative aspect-[4/3] overflow-hidden rounded-card"
          role="img"
          aria-label={`A CNA group around a campfire on a Himalayan hillside. Video coming soon: CNA in 60 seconds.`}
        >
          <Image
            src="/img/cna/manali/03.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-dark/10 to-dark/65" />
          <span
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-light shadow-float transition group-hover:scale-110"
            aria-hidden="true"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden" />
            <PlayIcon className="relative ml-1" />
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5 text-light">
            <span className="tag border-light/50 bg-dark/30 text-light">Video coming soon</span>
            <p className="mt-2 text-[15px] font-semibold">CNA in 60 seconds: {yearsActive()} years of camps</p>
          </div>
        </div>
        <div className="absolute -bottom-6 right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-light bg-primary text-center text-light shadow-float sm:-right-6 sm:h-36 sm:w-36">
          <span className="font-mono text-[11px] uppercase tracking-[.14em]">Since</span>
          <span className="display text-[40px] leading-none">{FOUNDED_YEAR}</span>
        </div>
      </div>

      <div className="reveal">
        <p className="eyebrow">Who we are</p>
        <h2 id="story-title" className="h-section mt-3">
          A nature club, not a tour company
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-muted">
          Climber Nature Adventure Club (CNA) is an eco-tourism and adventure club from Rajkot. Since our first Marine
          Camp at Bet Dwarka in {FOUNDED_YEAR}, we have taken 1,00,000+ people into forests, mountains and the sea.
          Adventure is the way in. Coming closer to nature is the goal.
        </p>
        <ul className="mt-8 space-y-5">
          {storyPoints.map((p) => (
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
