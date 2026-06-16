"use client";

import { contact, site } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";
import { Reveal } from "./Reveal";

const links = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "GitHub", value: contact.github.label, href: contact.github.href },
  { label: "LinkedIn", value: contact.linkedin.label, href: contact.linkedin.href },
  { label: "LeetCode", value: contact.leetcode.label, href: contact.leetcode.href },
];

export function Contact() {
  return (
    <section id="contact" className="container-page scroll-mt-16 py-20 sm:py-28">
      <SectionLabel index="04" title="Get in touch" />

      <Reveal>
        <div className="panel overflow-hidden">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-xs text-accent">
                {site.targeting}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Open to internship opportunities.
              </h3>
              <p className="mt-3 max-w-md text-muted">
                I&apos;m actively looking for full-stack, backend, and AI agent
                development roles. The fastest way to reach me is email — I
                reply within a day.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                {contact.email}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-px self-center overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center justify-between gap-3 bg-surface px-4 py-3 transition-colors hover:bg-surface-2"
                  >
                    <span className="mono-label">{l.label}</span>
                    <span className="truncate font-mono text-xs text-fg">
                      {l.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center gap-2 border-t border-border pt-8 text-center">
        <p className="font-mono text-xs text-faint">
          Built with Next.js · TypeScript · Tailwind · Framer Motion
        </p>
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </section>
  );
}
