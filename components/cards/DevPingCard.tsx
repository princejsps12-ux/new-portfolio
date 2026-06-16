"use client";

import { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Region = "us-east" | "eu-west";

const REGION_BASE: Record<Region, number> = {
  "us-east": 52,
  "eu-west": 94,
};

const POINTS = 48;
const W = 520;
const H = 140;
const MAX_MS = 220;
const SAMPLE_MS = 650;

type Sample = { ms: number; incident: boolean };

/**
 * Live latency monitor: an SVG sparkline that continuously plots simulated
 * response times, flashes a red incident marker on occasional spikes, then
 * recovers. Region toggle reshapes the data. rAF-driven, paused offscreen,
 * fully cleaned up on unmount.
 */
export function DevPingCard() {
  const { ref, inView } = useReveal<HTMLDivElement>({ once: false });
  const reduced = usePrefersReducedMotion();
  const [region, setRegion] = useState<Region>("us-east");
  const [samples, setSamples] = useState<Sample[]>(() => seed("us-east"));

  const regionRef = useRef(region);
  regionRef.current = region;

  // Reseed instantly when region changes so the toggle feels responsive.
  useEffect(() => {
    setSamples(seed(region));
  }, [region]);

  useEffect(() => {
    if (reduced || !inView) return;

    let raf = 0;
    let last = performance.now();
    let acc = 0;

    const loop = (now: number) => {
      acc += now - last;
      last = now;
      if (acc >= SAMPLE_MS) {
        acc = 0;
        setSamples((prev) => {
          const next = prev.slice(1);
          next.push(nextSample(regionRef.current));
          return next;
        });
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const latest = samples[samples.length - 1];
  const avg = Math.round(
    samples.reduce((s, p) => s + p.ms, 0) / samples.length
  );
  const incidentActive = latest?.incident;

  const stepX = W / (POINTS - 1);
  const toY = (ms: number) => H - (Math.min(ms, MAX_MS) / MAX_MS) * (H - 16) - 8;
  const path = samples
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * stepX).toFixed(1)} ${toY(p.ms).toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`relative flex h-2 w-2 ${incidentActive ? "" : ""}`}
            aria-hidden="true"
          >
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                incidentActive ? "bg-danger" : "bg-accent"
              }`}
            />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            latency monitor
          </span>
        </div>
        <div
          className="flex rounded-md border border-border p-0.5"
          role="group"
          aria-label="Region"
        >
          {(["us-east", "eu-west"] as Region[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              className={`rounded px-2 py-0.5 font-mono text-[10px] transition-colors ${
                region === r
                  ? "bg-accent text-bg"
                  : "text-faint hover:text-fg"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border">
        <Stat label="current" value={`${latest?.ms ?? 0}ms`} tone={incidentActive ? "danger" : "accent"} />
        <Stat label="avg" value={`${avg}ms`} />
        <Stat
          label="status"
          value={incidentActive ? "incident" : "healthy"}
          tone={incidentActive ? "danger" : "accent"}
        />
      </div>

      <div className="bg-surface px-3 pb-3 pt-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[140px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label={`Simulated response time for ${region}, currently ${latest?.ms ?? 0} milliseconds`}
        >
          <defs>
            <linearGradient id="dp-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((g) => (
            <line
              key={g}
              x1="0"
              x2={W}
              y1={H * g}
              y2={H * g}
              stroke="rgb(var(--border))"
              strokeWidth="1"
            />
          ))}

          <path d={area} fill="url(#dp-fill)" />
          <path
            d={path}
            fill="none"
            stroke={incidentActive ? "rgb(var(--danger))" : "rgb(var(--accent))"}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ transition: "stroke 200ms" }}
          />

          {samples.map((p, i) =>
            p.incident ? (
              <g key={i}>
                <circle
                  cx={i * stepX}
                  cy={toY(p.ms)}
                  r="4"
                  fill="rgb(var(--danger))"
                />
                <circle
                  cx={i * stepX}
                  cy={toY(p.ms)}
                  r="4"
                  fill="none"
                  stroke="rgb(var(--danger))"
                  strokeWidth="1.5"
                  className={reduced ? "" : "animate-ping-slow"}
                  style={{ transformOrigin: `${i * stepX}px ${toY(p.ms)}px` }}
                />
              </g>
            ) : null
          )}
        </svg>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "accent" | "danger";
}) {
  const color =
    tone === "danger"
      ? "text-danger"
      : tone === "accent"
        ? "text-accent"
        : "text-fg";
  return (
    <div className="bg-surface px-4 py-3">
      <div className="mono-label">{label}</div>
      <div className={`mt-1 font-mono text-base font-semibold ${color}`}>
        {value}
      </div>
    </div>
  );
}

function nextSample(region: Region): Sample {
  const base = REGION_BASE[region];
  const incident = Math.random() < 0.08;
  if (incident) {
    return { ms: Math.round(base + 120 + Math.random() * 60), incident: true };
  }
  return { ms: Math.round(base + (Math.random() - 0.5) * 28), incident: false };
}

function seed(region: Region): Sample[] {
  return Array.from({ length: POINTS }, () => nextSample(region)).map((s) =>
    // Suppress incidents in the initial seed so the chart starts calm.
    s.incident ? { ms: REGION_BASE[region] + 10, incident: false } : s
  );
}
