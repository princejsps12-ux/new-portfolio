"use client";

import { metrics } from "@/lib/data";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function MetricsStrip() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="container-page grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {metrics.map((m, i) => (
          <Reveal
            key={m.label}
            delay={i * 0.08}
            className="px-4 py-7 sm:px-6 sm:py-9"
          >
            <div className="font-mono text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              <CountUp
                value={m.value}
                decimals={m.decimals}
                prefix={m.prefix}
                suffix={m.suffix}
              />
            </div>
            <div className="mono-label mt-2">{m.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
