"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Phase = "idle" | "user" | "thinking" | "result";

const QUERY = "find my resume in Drive";

/** Mini chat: user query → "thinking" indicator → file-card result slides in. Loops. */
export function TailorTalkCard() {
  const { ref, inView } = useReveal<HTMLDivElement>({ once: false });
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "result" : "idle");
  const [typed, setTyped] = useState(reduced ? QUERY.length : 0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduced || !inView) return;

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const run = () => {
      clearAll();
      setPhase("user");
      setTyped(0);

      // Type the query out.
      let i = 0;
      const typeStep = () => {
        i += 1;
        setTyped(i);
        if (i < QUERY.length) timers.current.push(setTimeout(typeStep, 55));
        else {
          timers.current.push(
            setTimeout(() => setPhase("thinking"), 500),
            setTimeout(() => setPhase("result"), 1900),
            // Restart the loop.
            setTimeout(run, 5200)
          );
        }
      };
      timers.current.push(setTimeout(typeStep, 300));
    };

    run();
    return clearAll;
  }, [inView, reduced]);

  return (
    <div ref={ref} className="panel flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          drive agent
        </span>
        <span className="font-mono text-[10px] text-accent">● online</span>
      </div>

      <div className="flex-1 space-y-3 p-4">
        {/* User bubble */}
        {phase !== "idle" && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-accent/10 px-3 py-2 text-sm text-fg">
              {QUERY.slice(0, typed)}
              {phase === "user" && typed < QUERY.length && (
                <span className="ml-0.5 inline-block h-3.5 w-[2px] -translate-y-[1px] bg-accent align-middle animate-caret" />
              )}
            </div>
          </div>
        )}

        {/* Agent thinking / result */}
        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-3 py-2.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-muted"
                    style={{
                      animation: "blink-caret 1.1s infinite",
                      animationDelay: `${d * 0.18}s`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-start"
            >
              <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-border bg-surface-2 p-2.5">
                <p className="mb-2 text-sm text-muted">
                  Found 1 match in your Drive:
                </p>
                <div className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-mono text-[12px] text-fg">
                      Prince_Pandey_Resume.pdf
                    </div>
                    <div className="font-mono text-[10px] text-faint">
                      PDF · 248 KB · modified 2d ago
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
          <span className="flex-1 truncate font-mono text-[12px] text-faint">
            Ask about your Drive…
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-md bg-accent text-bg">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
