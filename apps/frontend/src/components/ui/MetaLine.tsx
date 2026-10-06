/** Short facts as one plain line, e.g. "6D/5N · 3,000 m · Easy". */
export function MetaLine({ items, className = "text-[14px] text-muted" }: { items: (string | null | undefined | false)[]; className?: string }) {
  return <p className={`font-medium ${className}`}>{items.filter(Boolean).join(" · ")}</p>;
}
