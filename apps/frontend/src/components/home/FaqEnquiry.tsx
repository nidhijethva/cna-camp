import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import type { Faq } from "@/types/content";

interface FaqEnquiryProps {
  faqs: Faq[];
  trips: { slug: string; name: string }[];
}

export function FaqEnquiry({ faqs, trips }: FaqEnquiryProps) {
  return (
    <section className="wrap mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="faq-title">
      <div>
        <div className="mb-10">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className="h-section mt-3">
            Good to know
          </h2>
        </div>
        <div className="divide-y divide-line border-y border-line">
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
      </div>
      <div id="enquire">
        <EnquiryForm trips={trips} />
      </div>
    </section>
  );
}
