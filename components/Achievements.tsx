"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { achievements } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Achievements() {
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="achievements"
      className="container-page scroll-mt-16 py-20 sm:py-28"
    >
      <SectionLabel index="03" title="Achievements" />

      <ol ref={listRef} className="relative ml-2 space-y-8">
        {/* Track */}
        <div
          className="absolute left-0 top-1 h-full w-px bg-border"
          aria-hidden="true"
        />
        {/* Drawing line */}
        <motion.div
          className="absolute left-0 top-1 h-full w-px origin-top bg-accent"
          style={{ scaleY: reduced ? 1 : scaleY }}
          aria-hidden="true"
        />

        {achievements.map((a, i) => (
          <li key={a.title} className="relative pl-7">
            <motion.span
              className="absolute -left-[5px] top-1 grid h-2.5 w-2.5 place-items-center rounded-full bg-accent ring-4 ring-bg"
              initial={{ scale: reduced ? 1 : 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-30% 0px -30% 0px" }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 18,
                delay: reduced ? 0 : 0.05,
              }}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: reduced ? 0 : 0.5, delay: i * 0.05 }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="inline-flex items-center rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {a.placement}
                </span>
                <h3 className="text-base font-semibold tracking-tight">
                  {a.title}
                </h3>
                <span className="font-mono text-xs text-faint">{a.year}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{a.org}</p>
            </motion.div>
          </li>
        ))}
      </ol>
    </section>
  );
}
