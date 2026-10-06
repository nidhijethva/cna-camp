import Image from "next/image";
import { photoSrc } from "@/lib/photos";
import type { PhotoSource } from "@/types/content";

interface PhotoProps {
  /** CMS image or design photo key (e.g. "cna/manali/01"). Empty shows a labelled placeholder. */
  img?: PhotoSource | null;
  /** Defaults to the CMS image's own alt text. */
  alt?: string;
  /** Placeholder caption, e.g. the region or what photo is needed. */
  label?: string;
  wide?: boolean;
  preload?: boolean;
  sizes?: string;
  className?: string;
}

/** Fills its (positioned) parent. Missing photos render a "Photo coming soon" placeholder. */
export function Photo({ img, alt, label, wide, preload, sizes = "(min-width: 1024px) 50vw, 100vw", className = "" }: PhotoProps) {
  if (!img) return <PhotoPlaceholder label={label} className={className} />;
  return (
    <Image
      src={photoSrc(img, { wide })}
      alt={alt ?? (typeof img === "string" ? "" : img.alt)}
      fill
      preload={preload}
      sizes={sizes}
      className={`object-cover ${className}`}
      style={typeof img !== "string" && img.focalX != null ? { objectPosition: `${img.focalX}% ${img.focalY ?? 50}%` } : undefined}
    />
  );
}

export function PhotoPlaceholder({ label, kind = "photo", dark = false, className = "" }: { label?: string; kind?: "photo" | "video"; dark?: boolean; className?: string }) {
  const need = kind === "video" ? "Video coming soon" : "Photo coming soon";
  return (
    <div
      role="img"
      aria-label={label ? `${need}: ${label}` : need}
      className={`topo absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center ${dark ? "bg-dark-soft text-light/70" : "bg-soft text-muted"} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-14 w-14 items-center justify-center rounded-full ${dark ? "bg-light/10" : "bg-light shadow-card"}`}
      >
        {kind === "video" ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 7h3l2-2.5h6L17 7h3v12H4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
        )}
      </span>
      <span className="font-mono text-[11.5px] uppercase tracking-[.1em]">{need}</span>
      {label && <span className="max-w-[260px] text-[14px] leading-snug">{label}</span>}
    </div>
  );
}
