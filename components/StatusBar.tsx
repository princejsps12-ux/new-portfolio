"use client";

/** Pulsing green status pill — the "all systems operational" signal. */
export function StatusBar() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-3.5 py-1.5">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping-slow" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        all systems operational
      </span>
    </div>
  );
}
