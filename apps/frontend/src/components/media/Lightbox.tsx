"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Click any `[data-full]` element inside a `.gal` group to open it full screen.
 * Arrows and ← / → move within that group; Esc or ✕ closes.
 */
export function Lightbox({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);

  const step = useCallback((delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length), [slides.length]);

  const onClick = (e: React.MouseEvent) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>(".gal [data-full]");
    if (!trigger) return;
    const group = [...trigger.closest(".gal")!.querySelectorAll<HTMLElement>("[data-full]")];
    setSlides(
      group.map((el) => ({
        src: el.dataset.full!,
        alt: el.querySelector("img")?.alt ?? "",
        caption: el.dataset.caption ?? "",
      })),
    );
    setIndex(group.indexOf(trigger));
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  const slide = slides[index];

  return (
    <div onClick={onClick}>
      {children}
      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        className="m-auto w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-black/85"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
      >
        {slide && (
          <>
            <div className="relative h-[min(80vh,720px)] w-full">
              <Image src={slide.src} alt={slide.alt} fill sizes="94vw" className="rounded-card object-contain" />
            </div>
            {slide.caption && <p className="mt-2 text-center text-[14px] text-light/75">{slide.caption}</p>}
            <div className="mt-3 flex items-center justify-between gap-3 text-light">
              <button type="button" onClick={() => step(-1)} className="btn btn-outline-light min-h-11! px-4!" aria-label="Previous photo">
                ←
              </button>
              <span className="font-mono text-[12px] tracking-[.1em]">
                {index + 1} / {slides.length}
              </span>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(1)} className="btn btn-outline-light min-h-11! px-4!" aria-label="Next photo">
                  →
                </button>
                <button type="button" onClick={() => dialogRef.current?.close()} className="btn btn-primary min-h-11! px-4!" aria-label="Close">
                  ✕
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
