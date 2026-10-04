import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { audiences } from "@/content/home";

export function Audiences() {
  return (
    <section className="wrap mt-24" aria-labelledby="audiences-title">
      <SectionHeader
        id="audiences-title"
        eyebrow="Who travels with us"
        title="Your group. Your kind of trip."
        action={{ label: "Group trips", href: "/group-trips" }}
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => (
          <li key={a.title} className="reveal">
            <Link
              href={a.href}
              className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-light transition hover:-translate-y-1 hover:border-dark hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-soft">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <span className="tag tag-solid absolute left-3 top-3">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="display text-[24px]">{a.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-muted">{a.description}</p>
                <p className="mt-5 font-semibold group-hover:text-primary">Find trips →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-card bg-soft px-5 py-4 text-[15px]">
        <span aria-hidden="true">🏫</span>
        <strong>Teachers:</strong> school trips start at 50 students, and 1 teacher travels free with every 25 students.
        <Link href="/group-trips#schools" className="font-semibold text-primary underline">
          Plan a school trip →
        </Link>
      </p>
    </section>
  );
}
