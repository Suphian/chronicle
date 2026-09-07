"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/story", label: "Story" },
  { href: "/people", label: "People" },
  { href: "/world", label: "World" },
  { href: "/workshop", label: "Writing room" },
];

export function Nav() {
  const path = usePathname();
  const inReader = path.startsWith("/chapters/");

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 md:px-10">
      <Link href="/" className="font-display text-xs tracking-[0.35em] text-parchment/70 uppercase transition hover:text-parchment">
        {inReader ? "← Chronicle" : "The Chronicle"}
      </Link>
      <nav aria-label="Main navigation" className="flex items-center gap-5">
        {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={path === l.href || (l.href === "/story" && inReader) ? "page" : undefined}
              className={`font-display text-xs tracking-[0.1em] uppercase transition ${
                path === l.href || (l.href === "/story" && inReader) ? "text-parchment underline underline-offset-8" : "text-parchment/80 hover:text-parchment"
              }`}
            >
              {l.label}
            </Link>
          ))}
      </nav>
    </header>
  );
}
