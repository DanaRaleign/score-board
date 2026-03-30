"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Hub" },
  { href: "/submit", label: "Submit" },
  { href: "/leaderboard", label: "Board" },
  { href: "/my", label: "My Rank" },
  { href: "/about", label: "Info" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Primary">
      {items.map((item) => {
        const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link key={item.href} href={item.href} className={`bottom-nav-link ${active ? "active" : ""}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
