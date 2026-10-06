import type { ReactNode } from "react";
import { Photo } from "@/components/media/Photo";
import type { PhotoSource } from "@/types/content";

interface PageHeadProps {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  /** With a photo: dark hero. Without: light contour-line band. */
  img?: PhotoSource | null;
  children?: ReactNode;
}

export function PageHead({ eyebrow, title, text, img, children }: PageHeadProps) {
  if (img) {
    return (
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div className="kenburns absolute inset-0 -z-10 overflow-hidden opacity-90">
          <Photo img={img} wide preload sizes="100vw" />
        </div>
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-dark/85 to-dark/35" />
        <div className="wrap py-20 sm:py-28">
          <p className="eyebrow text-light/70!">{eyebrow}</p>
          <h1 className="h-page mt-3 max-w-3xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-[18px] text-light/85">{text}</p>}
          {children}
        </div>
      </section>
    );
  }
  return (
    <section className="topo border-b border-line bg-soft">
      <div className="wrap py-14 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h-page mt-3 max-w-3xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-[17px] text-muted">{text}</p>}
        {children}
      </div>
    </section>
  );
}
