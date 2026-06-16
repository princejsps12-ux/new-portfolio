"use client";

import { useMemo, useState } from "react";

type Mode = "add" | "remove";
const RATES = [5, 12, 18, 28];

/**
 * A small, fully functional GST calculator — the live panel for the GST
 * Calculator project card. Add GST to a base amount or extract it from a
 * GST-inclusive total. Pure controlled inputs, no timers or rAF.
 */
export function GstCalculatorCard() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<Mode>("add");

  const { base, gst, total } = useMemo(() => {
    const value = Math.max(0, parseFloat(amount) || 0);
    if (mode === "add") {
      const g = (value * rate) / 100;
      return { base: value, gst: g, total: value + g };
    }
    // remove: input is GST-inclusive total
    const b = value / (1 + rate / 100);
    return { base: b, gst: value - b, total: value };
  }, [amount, rate, mode]);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          gst calculator
        </span>
        <div
          className="flex rounded-md border border-border p-0.5"
          role="group"
          aria-label="Calculation mode"
        >
          {(["add", "remove"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded px-2.5 py-0.5 font-mono text-[10px] capitalize transition-colors ${
                mode === m ? "bg-accent text-bg" : "text-faint hover:text-fg"
              }`}
            >
              {m} GST
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <label className="block">
          <span className="mono-label">
            {mode === "add" ? "amount (excl. GST)" : "total (incl. GST)"}
          </span>
          <div className="mt-1.5 flex items-center rounded-lg border border-border bg-surface-2 px-3 focus-within:border-accent/60">
            <span className="font-mono text-sm text-faint">₹</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              aria-label="Amount in rupees"
              className="w-full bg-transparent px-2 py-2 font-mono text-lg text-fg outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </label>

        <div>
          <span className="mono-label">gst rate</span>
          <div className="mt-1.5 flex gap-1.5">
            {RATES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                aria-pressed={rate === r}
                className={`flex-1 rounded-md border py-1.5 font-mono text-xs transition-colors ${
                  rate === r
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-border bg-surface-2 text-muted hover:text-fg"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
          <Cell label="base" value={base} />
          <Cell label={`gst (${rate}%)`} value={gst} tone="accent" />
          <Cell label="total" value={total} strong />
        </dl>
      </div>
    </div>
  );
}

function Cell({
  label,
  value,
  tone = "default",
  strong = false,
}: {
  label: string;
  value: number;
  tone?: "default" | "accent";
  strong?: boolean;
}) {
  const formatted = value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <div className="bg-surface px-3 py-3">
      <dt className="mono-label truncate">{label}</dt>
      <dd
        className={`mt-1 font-mono text-sm ${
          tone === "accent" ? "text-accent" : "text-fg"
        } ${strong ? "font-semibold" : ""}`}
      >
        ₹{formatted}
      </dd>
    </div>
  );
}
