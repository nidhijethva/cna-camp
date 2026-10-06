"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { enquireHref, isNavActive, type NavItem } from "@/content/site";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center rounded-card border border-line"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-light shadow-panel"
        onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
      >
        <ul className="wrap py-3">
          {items.map((item) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <Link href={item.href} className={`block py-3 text-lg font-bold ${isNavActive(item, pathname) ? "text-primary" : ""}`}>
                {item.label}
              </Link>
              {item.children && (
                <div className="grid grid-cols-2 gap-x-4 pb-3">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className="py-2 text-[15px] text-muted hover:text-primary">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className="pt-3">
            <Link href={enquireHref()} className="btn btn-primary w-full">
              Enquire now
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
