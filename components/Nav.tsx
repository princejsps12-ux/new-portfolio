"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-page flex h-14 items-center justify-between"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-accent">~/</span>
          <span>prince-pandey</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/resume"
            className="rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent/50"
          >
            Résumé
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
