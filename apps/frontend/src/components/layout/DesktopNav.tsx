"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "@/components/ui/icons";
import { isNavActive, type NavItem } from "@/content/site";

const itemClass =
  "flex items-center gap-1 whitespace-nowrap rounded-card px-2.5 py-2 text-[14.5px] font-semibold transition-colors hover:bg-soft data-[state=open]:bg-soft";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root aria-label="Main" className="hidden lg:block" delayDuration={80}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        {items.map((item) =>
          item.children ? (
            <NavigationMenu.Item key={item.href} className="relative">
              <NavigationMenu.Trigger className={`group ${itemClass} ${isNavActive(item, pathname) ? "text-primary" : ""}`}>
                {item.label}
                <ChevronDownIcon className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-card border border-line bg-light p-2 shadow-menu">
                <ul>
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <NavigationMenu.Link asChild>
                        <Link href={c.href} className="block rounded-tag px-3 py-2 text-[15px] hover:bg-soft focus:bg-soft focus:outline-none">
                          {c.label}
                        </Link>
                      </NavigationMenu.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={item.href}>
              <NavigationMenu.Link asChild>
                <Link
                  href={item.href}
                  aria-current={isNavActive(item, pathname) ? "page" : undefined}
                  className={`${itemClass} ${isNavActive(item, pathname) ? "text-primary" : ""}`}
                >
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
