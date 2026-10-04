"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/** Server-renders the final value (for crawlers / no-JS) and counts up from 0 when scrolled into view. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/[\d,]+/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const end = Number(match[0].replace(/,/g, ""));
    const grouped = match[0].includes(",");
    const format = (n: number) => value.replace(match[0], grouped ? n.toLocaleString("en-IN") : String(n));

    let frame = 0;
    let start: number | undefined;
    const step = (now: number) => {
      start ??= now;
      const progress = Math.min(Math.max((now - start) / DURATION_MS, 0), 1);
      setDisplay(format(Math.round(end * (1 - (1 - progress) ** 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <p ref={ref} className={className}>
      {display}
    </p>
  );
}
