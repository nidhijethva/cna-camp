import Image from "next/image";
import Link from "next/link";
import { whyCna } from "@/content/home";

export function WhyCna() {
  return (
    <section className="mt-24 bg-dark text-light" aria-labelledby="why-title">
      <div className="wrap grid items-center gap-12 py-20 lg:grid-cols-2">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src="/img/climb.jpg"
            alt="A camper rock climbing on a boulder in a pine forest"
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover"
          />
          <span className="tag tag-solid absolute bottom-4 left-4 border-light/30">Rock climbing</span>
        </div>
        <div className="reveal">
          <p className="eyebrow text-light/60!">Why CNA</p>
          <h2 id="why-title" className="h-section mt-3">
            Nearly 30 years of getting people home happy
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {whyCna.map((w) => (
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
