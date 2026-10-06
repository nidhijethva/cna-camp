import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { FaqList } from "@/components/ui/FaqList";
import type { Faq } from "@/types/content";

export function FaqEnquiry({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="wrap mt-24 grid gap-12 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="faq-title">
      <div>
        <div className="mb-10">
          <p className="eyebrow">FAQs</p>
          <h2 id="faq-title" className="h-section mt-3">
            Good to know
          </h2>
        </div>
        <FaqList faqs={faqs} />
      </div>
      <div id="enquire">
        <EnquiryForm />
      </div>
    </section>
  );
}
