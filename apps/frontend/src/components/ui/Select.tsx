"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  options: SelectOption[];
  /** Label of the "no choice" option (submits an empty value), e.g. "Anywhere". */
  emptyLabel?: string;
  defaultValue?: string;
  /** Controlled mode: pass `value` and `onValueChange` together. */
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

// Radix items can't use "" as a value, so the empty choice is mapped to a sentinel.
const EMPTY = "__empty__";

/** Themed select that submits like a native one (via a hidden input) in GET forms and server actions. */
export function Select({ name, options, emptyLabel, defaultValue = "", value: controlled, onValueChange, className = "", ...aria }: SelectProps) {
  const toInternal = (v: string) => v || (emptyLabel ? EMPTY : (options[0]?.value ?? ""));
  const [uncontrolled, setUncontrolled] = useState(toInternal(defaultValue));
  const value = controlled === undefined ? uncontrolled : toInternal(controlled);
  const setValue = (v: string) => {
    // Radix's hidden native <select> reports "" when a value is set before its options mount;
    // a real "no choice" pick arrives as EMPTY, so a raw "" is never a user action.
    if (v === "") return;
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v === EMPTY ? "" : v);
  };
  const items = emptyLabel ? [{ value: EMPTY, label: emptyLabel }, ...options] : options;

  return (
    <RadixSelect.Root value={value} onValueChange={setValue}>
      <RadixSelect.Trigger
        className={`field flex items-center justify-between gap-3 text-left data-[state=open]:border-dark ${className}`}
        {...aria}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon className="shrink-0 text-muted transition-transform duration-200 [[data-state=open]_&]:rotate-180">
          <ChevronDownIcon size={12} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <input type="hidden" name={name} value={value === EMPTY ? "" : value} />

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          collisionPadding={12}
          className="z-50 max-h-[min(360px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-card border border-line bg-light shadow-menu"
        >
          <RadixSelect.Viewport className="p-1.5">
            {items.map((o) => (
              <RadixSelect.Item
                key={o.value}
                value={o.value}
                className="relative flex min-h-10 cursor-pointer select-none items-center rounded-tag py-2 pl-3 pr-9 text-[15px] outline-none data-[highlighted]:bg-soft data-[state=checked]:font-semibold"
              >
                <RadixSelect.ItemText>{o.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3 text-primary">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M2.5 7.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
