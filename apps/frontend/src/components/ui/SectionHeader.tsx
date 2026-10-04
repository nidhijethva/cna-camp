import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { label: string; href: string };
  dark?: boolean;
  id?: string;
}

export function SectionHeader({ eyebrow, title, intro, action, dark, id }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className={`eyebrow ${dark ? "text-light/60!" : ""}`}>{eyebrow}</p>
        <h2 id={id} className="h-section mt-3">
          {title}
        </h2>
        {intro && (
          <p className={`mt-4 max-w-2xl text-[17px] leading-relaxed ${dark ? "text-light/70" : "text-muted"}`}>
            {intro}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className={`btn shrink-0 self-start md:self-auto ${dark ? "btn-outline-light" : "btn-outline"}`}
        >
          {action.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
