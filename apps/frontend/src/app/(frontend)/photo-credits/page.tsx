import type { Metadata } from "next";
import { PageHead } from "@/components/layout/PageHead";
import { photoCredits } from "@/content/credits";
import { getTrips } from "@/lib/content";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Credits for Creative Commons photos used on the CNA Camp website.",
  alternates: { canonical: "/photo-credits" },
};

const otherSlots: Record<string, string> = {
  "campus-dwarka": "Bet Dwarka campus",
  "campus-hingolgadh": "Hingolgadh camp",
  tribute: "Founder tribute",
  "aud-school": "Home: school groups",
  "aud-solo": "Home: solo travellers",
};

export default async function PhotoCreditsPage() {
  const trips = await getTrips();
  const usedOn = (slot: string) => trips.find((t) => t.slug === slot)?.name ?? otherSlots[slot] ?? slot;
  return (
    <>
      <PageHead
        eyebrow="Photo credits"
        title="Photo credits"
        text="Some photos on this site are from photographers who share their work under Creative Commons licences. Thank you. They will be replaced by CNA's own trip photos over time."
      />
      <section className="wrap mt-12">
        <div className="overflow-x-auto rounded-card border border-line">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead className="bg-soft font-mono text-[11px] uppercase tracking-[.08em] text-muted">
              <tr>
                <th className="p-3">Used on</th>
                <th className="p-3">Photo</th>
                <th className="p-3">By</th>
                <th className="p-3">Licence</th>
              </tr>
            </thead>
            <tbody>
              {photoCredits.map((c) => (
                <tr key={`${c.slot}-${c.source}`} className="border-t border-line">
                  <td className="p-3 font-semibold">{usedOn(c.slot)}</td>
                  <td className="p-3">
                    <a href={c.source} target="_blank" rel="noopener nofollow" className="text-primary underline">
                      {c.title}
                    </a>
                  </td>
                  <td className="p-3">{c.creator}</td>
                  <td className="p-3">{c.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px] text-muted">
          Photos are resized and compressed for the web. Licence texts:{" "}
          <a href="https://creativecommons.org/licenses/" target="_blank" rel="noopener" className="underline">
            creativecommons.org/licenses
          </a>
          .
        </p>
      </section>
    </>
  );
}
