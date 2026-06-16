"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SAMPLE_ANSWER =
  "I'd start by clarifying the constraints, then sketch the data model before the API surface…";

const RADAR_AXES = [
  { label: "Clarity", value: 0.82 },
  { label: "Depth", value: 0.7 },
  { label: "Structure", value: 0.88 },
  { label: "Confidence", value: 0.65 },
  { label: "Relevance", value: 0.78 },
];

/** Waveform (canvas) + live "transcribing…" caption + radar chart that draws on reveal. */
export function InterVAICard() {
  const { ref, inView } = useReveal<HTMLDivElement>({ once: false });
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          interview session
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-danger">
          <span className="h-2 w-2 rounded-full bg-danger" />
          REC
        </span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2">
        <div className="flex flex-col">
          <Waveform active={inView && !reduced} />
          <Transcript active={inView && !reduced} />
        </div>
        <Radar active={inView} reduced={reduced} />
      </div>
    </div>
  );
}

function Waveform({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const bars = 40;
    let raf = 0;
    let t = 0;

    const accent = getColor("--accent");

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const gap = 3;
      const bw = (w - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        // Layered sines + a moving envelope = speech-like pulsing.
        const env = 0.5 + 0.5 * Math.sin(t * 0.05 + i * 0.4);
        const fast = 0.5 + 0.5 * Math.sin(t * 0.18 + i * 0.9);
        const amp = (0.18 + 0.82 * env * fast) * (h * 0.9);
        const x = i * (bw + gap);
        const y = (h - amp) / 2;
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.35 + 0.65 * fast;
        roundRect(ctx, x, y, bw, amp, Math.min(bw / 2, 2));
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      t += 1;
      raf = requestAnimationFrame(draw);
    };

    if (active) raf = requestAnimationFrame(draw);
    else {
      // Render one static frame so it isn't blank when paused.
      t = 10;
      draw();
      cancelAnimationFrame(raf);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="h-16 w-full"
      role="img"
      aria-label="Audio waveform visualization of the candidate speaking"
    />
  );
}

function Transcript({ active }: { active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(SAMPLE_ANSWER.length);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i = i >= SAMPLE_ANSWER.length ? 0 : i + 1;
      setCount(i);
      // Pause at the end before looping.
      timer = setTimeout(tick, i === SAMPLE_ANSWER.length ? 1800 : 45);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="mt-3 rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5">
        <span className="mono-label text-accent">transcribing</span>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="h-1 w-1 rounded-full bg-accent"
              style={{
                animation: active ? "blink-caret 1.2s infinite" : "none",
                animationDelay: `${d * 0.2}s`,
              }}
            />
          ))}
        </span>
      </div>
      <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-muted">
        {SAMPLE_ANSWER.slice(0, count)}
        <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] bg-accent align-middle animate-caret" />
      </p>
    </div>
  );
}

function Radar({ active, reduced }: { active: boolean; reduced: boolean }) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const n = RADAR_AXES.length;

  const point = (i: number, radius: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
  };

  const valuePath =
    RADAR_AXES.map((a, i) => {
      const [x, y] = point(i, r * a.value);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ") + " Z";

  return (
    <div className="grid place-items-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-[200px] w-[200px]"
        role="img"
        aria-label="Radar chart scoring the candidate across five dimensions"
      >
        {/* Grid rings */}
        {[0.33, 0.66, 1].map((ring) => (
          <polygon
            key={ring}
            points={RADAR_AXES.map((_, i) => point(i, r * ring).join(",")).join(" ")}
            fill="none"
            stroke="rgb(var(--border))"
            strokeWidth="1"
          />
        ))}
        {/* Axes that "draw" from center on reveal */}
        {RADAR_AXES.map((a, i) => {
          const [x, y] = point(i, r);
          return (
            <motion.line
              key={a.label}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgb(var(--border))"
              strokeWidth="1"
              initial={{ pathLength: reduced ? 1 : 0, opacity: 0.4 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
            />
          );
        })}
        {/* Value polygon */}
        <motion.path
          d={valuePath}
          fill="rgb(var(--accent) / 0.18)"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          initial={{ scale: reduced ? 1 : 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
        {/* Labels */}
        {RADAR_AXES.map((a, i) => {
          const [x, y] = point(i, r + 14);
          return (
            <text
              key={a.label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-faint"
              style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}
            >
              {a.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function getColor(varName: string): string {
  if (typeof window === "undefined") return "rgb(74,222,128)";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return v ? `rgb(${v})` : "rgb(74,222,128)";
}
