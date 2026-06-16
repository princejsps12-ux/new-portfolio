"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  index: string;
  title: string;
  id?: string;
};

/**
 * Section header: monospace 01/02 marker, title, and a hairline divider that
 * draws left-to-right on reveal.
 */
export function SectionLabel({ index, title, id }: Props) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className="mb-10">
      <div className="flex items-baseline gap-3">
        <span className="mono-label text-accent">{index}</span>
        <h2
          id={id}
          className="scroll-mt-24 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="relative mt-4 h-px w-full bg-border">
        <motion.div
          className="absolute inset-y-0 left-0 bg-accent"
          initial={{ width: reduced ? "100%" : "0%" }}
          animate={inView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
