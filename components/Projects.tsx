"use client";

import { projects } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" className="container-page scroll-mt-16 py-20 sm:py-28">
      <SectionLabel index="01" title="Selected work" />
      <div className="space-y-6 sm:space-y-8">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 0.05, 0.15)} y={28}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
