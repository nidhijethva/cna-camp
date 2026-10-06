import type { Faq } from "@/types/content";

export function FaqList({ faqs, className = "" }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {faqs.map((f) => (
        <details key={f.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[18px] font-bold">
            <h3 className="leading-normal">{f.question}</h3>
            <span className="font-mono text-primary transition group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="mt-3 text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
