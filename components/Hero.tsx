"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site, contact } from "@/lib/data";
import { StatusBar } from "./StatusBar";
import { Typewriter } from "./Typewriter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(false);

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-name">
      {/* Background grid + scanline — very low opacity, GPU-friendly. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className={`absolute inset-0 bg-grid opacity-[0.18] ${
            reduced ? "" : "animate-grid-pan"
          }`}
          style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)" }}
        />
        {!reduced && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scanline" />
        )}
        <div className="absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24">
        <StatusBar />

        <h1
          id="hero-name"
          className="mt-7 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          <Typewriter text={site.name} speed={85} onDone={() => setTyped(true)} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={typed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-lg text-muted sm:text-xl">{site.tagline}</p>
          <p className="mt-3 font-mono text-sm text-faint">{site.role}</p>
          <p className="font-mono text-sm text-faint">{site.gradLine}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={typed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            View work
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent/50"
          >
            Get in touch
          </a>
          <div className="ml-1 flex items-center gap-3 font-mono text-xs text-faint">
            <a
              href={contact.github.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={contact.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={contact.leetcode.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-accent"
            >
              LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
