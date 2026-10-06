import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  body?: ReactNode[];
  list?: ReactNode[];
  /** First row is the header. */
  table?: string[][];
}

interface LegalPageProps {
  sections: LegalSection[];
  note?: string;
  updated?: string;
}

const num = (i: number) => String(i + 1).padStart(2, "0");

export function LegalPage({ sections, note, updated = "2 October 2026" }: LegalPageProps) {
  return (
    <div className="wrap mt-12 grid gap-10 lg:grid-cols-[240px_1fr]">
      <nav className="lg:sticky lg:top-28 lg:self-start" aria-label="On this page">
        <p className="eyebrow">On this page</p>
        <ol className="mt-3 space-y-2 text-[15px]">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-muted hover:text-primary">
                <span className="font-mono text-[12px] text-primary">{num(i)}</span> {s.title}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">Last updated: {updated}</p>
      </nav>
      <div className="max-w-3xl">
        {note && <p className="mb-8 rounded-card border border-primary bg-primary-soft p-4 text-[15px]">{note}</p>}
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="border-t border-line py-8 first:border-0 first:pt-0">
            <h2 className="h-sub">
              <span className="font-mono text-[14px] text-primary">{num(i)}</span> {s.title}
            </h2>
            {s.body?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {s.list && (
              <ul className="mt-4 space-y-2">
                {s.list.map((x, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="mt-5 overflow-hidden rounded-card border border-line">
                <table className="w-full text-left text-[15px]">
                  <thead className="bg-dark text-light">
                    <tr>
                      {s.table[0].map((h) => (
                        <th key={h} className="p-3 font-mono text-[11.5px] uppercase tracking-[.08em]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.slice(1).map((row) => (
                      <tr key={row[0]} className="border-t border-line">
                        {row.map((c, j) => (
                          <td key={j} className={j === 1 ? "display p-3 text-[22px] text-primary" : "p-3"}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
