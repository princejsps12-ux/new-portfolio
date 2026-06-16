"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Skills() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="skills" className="container-page scroll-mt-16 py-20 sm:py-28">
      <SectionLabel index="02" title="Stack & skills" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="panel p-5"
          >
            <h3 className="mono-label mb-3.5 text-accent">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    delay: reduced ? 0 : i * 0.04,
                  }}
                  className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
