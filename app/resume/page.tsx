import type { Metadata } from "next";
import Link from "next/link";
import {
  site,
  contact,
  projects,
  skillGroups,
  achievements,
} from "@/lib/data";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name} — ${site.targeting}.`,
};

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      {/* Toolbar (hidden in print) */}
      <div className="no-print sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back
          </Link>
          <PrintButton />
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-10 print:py-0">
        <header className="border-b border-border pb-5">
          <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-muted">{site.role}</p>
          <p className="font-mono text-sm text-faint">{site.gradLine}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
            <a href={`mailto:${contact.email}`} className="hover:text-accent">
              {contact.email}
            </a>
            <a href={contact.linkedin.href} className="hover:text-accent">
              {contact.linkedin.label}
            </a>
            <a href={contact.github.href} className="hover:text-accent">
              {contact.github.label}
            </a>
            <a href={contact.leetcode.href} className="hover:text-accent">
              {contact.leetcode.label}
            </a>
          </div>
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed text-muted">{site.summary}</p>
        </Section>

        <Section title="Projects">
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold">
                    {p.name}{" "}
                    <span className="font-normal text-muted">— {p.tagline}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">
                    {p.live ? `${stripProto(p.live)} · ` : ""}
                    {stripProto(p.code)}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {p.stack.join(" · ")}
                </p>
                <ul className="mt-1.5 space-y-1">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <dl className="space-y-1.5">
            {skillGroups.map((g) => (
              <div key={g.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                <dt className="w-40 shrink-0 font-mono text-xs text-accent">
                  {g.label}
                </dt>
                <dd className="text-sm text-muted">{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Achievements">
          <ul className="space-y-1.5">
            {achievements.map((a) => (
              <li key={a.title} className="flex flex-wrap items-baseline gap-2 text-sm">
                <span className="font-mono text-xs text-accent">{a.placement}</span>
                <span className="font-medium">{a.title}</span>
                <span className="text-muted">— {a.org}</span>
                <span className="font-mono text-xs text-faint">{a.year}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <p className="text-sm text-muted">
            B.Tech, Information Technology — Manipal University Jaipur ·{" "}
            {site.gradLine}
          </p>
        </Section>
      </article>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2.5 font-mono text-xs uppercase tracking-[0.2em] text-faint">
        {title}
      </h2>
      {children}
    </section>
  );
}

function stripProto(url: string) {
  return url.replace(/^https?:\/\//, "");
}
