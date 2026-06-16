"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DevPingCard } from "./cards/DevPingCard";
import { InterVAICard } from "./cards/InterVAICard";
import { TaskFlowCard } from "./cards/TaskFlowCard";
import { TailorTalkCard } from "./cards/TailorTalkCard";

function Simulation({ id }: { id: Project["id"] }) {
  switch (id) {
    case "devping":
      return <DevPingCard />;
    case "intervai":
      return <InterVAICard />;
    case "taskflow":
      return <TaskFlowCard />;
    case "tailortalk":
      return <TailorTalkCard />;
  }
}

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const detailsId = `project-${project.id}-details`;

  return (
    <article className="group relative rounded-2xl border border-border bg-surface transition-colors hover:border-accent/40">
      {/* Border glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 50% 0%, rgb(var(--accent) / 0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">{project.index}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            {project.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>

          {/* Tech badges — stagger-fade when the card section reveals */}
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech, i) => (
              <motion.li
                key={tech}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduced ? 0 : 0.35,
                  delay: reduced ? 0 : i * 0.04,
                }}
                className="badge"
              >
                {tech}
              </motion.li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                Live
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H8M17 7v9" />
                </svg>
              </a>
            )}
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent/50"
            >
              Code
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              {open ? "Hide details" : "Case study"}
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </motion.svg>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={detailsId}
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: live simulation */}
        <div className="flex items-center">
          <div className="w-full">
            <Simulation id={project.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
