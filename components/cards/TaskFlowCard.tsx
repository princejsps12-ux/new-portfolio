"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Stage = "pending" | "processing" | "completed";
type Task = { id: number; label: string; stage: Stage; progress: number };

const LABELS = [
  "send-digest-email",
  "reindex-search",
  "generate-report",
  "sync-webhooks",
  "purge-cache",
];

const COLUMNS: { key: Stage; title: string }[] = [
  { key: "pending", title: "pending" },
  { key: "processing", title: "processing" },
  { key: "completed", title: "completed" },
];

const TICK = 600;

/** Celery/Redis async story: task chips flow pending → processing → completed on a loop. */
export function TaskFlowCard() {
  const { ref, inView } = useReveal<HTMLDivElement>({ once: false });
  const reduced = usePrefersReducedMotion();
  const [tasks, setTasks] = useState<Task[]>(() =>
    LABELS.slice(0, 4).map((label, i) => ({
      id: i,
      label,
      stage: "pending",
      progress: 0,
    }))
  );
  const [seq, setSeq] = useState(LABELS.length);

  useEffect(() => {
    if (reduced || !inView) return;
    const interval = setInterval(() => {
      setTasks((prev) => {
        let next = prev.map((t) => ({ ...t }));

        // Advance any processing task; complete it at 100%.
        next = next.map((t) =>
          t.stage === "processing"
            ? { ...t, progress: Math.min(t.progress + 25, 100) }
            : t
        );
        next = next.map((t) =>
          t.stage === "processing" && t.progress >= 100
            ? { ...t, stage: "completed" as Stage }
            : t
        );

        // Promote one pending → processing if the worker is free.
        const processing = next.filter((t) => t.stage === "processing").length;
        if (processing === 0) {
          const idx = next.findIndex((t) => t.stage === "pending");
          if (idx !== -1) next[idx] = { ...next[idx], progress: 0, stage: "processing" };
        }

        // Recycle: drop the oldest completed and enqueue a fresh pending task.
        const completed = next.filter((t) => t.stage === "completed");
        if (completed.length > 2) {
          next = next.filter((t) => t.id !== completed[0].id);
          setSeq((s) => {
            next.push({
              id: s,
              label: LABELS[s % LABELS.length],
              stage: "pending",
              progress: 0,
            });
            return s + 1;
          });
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(interval);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          task queue · celery + redis
        </span>
        <span className="font-mono text-[10px] text-faint">
          {tasks.filter((t) => t.stage !== "completed").length} active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-border">
        {COLUMNS.map((col) => (
          <div key={col.key} className="min-h-[180px] bg-surface p-2.5">
            <div className="mb-2 flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  col.key === "pending"
                    ? "bg-faint"
                    : col.key === "processing"
                      ? "bg-warn"
                      : "bg-accent"
                }`}
              />
              <span className="mono-label">{col.title}</span>
            </div>
            <ul className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {tasks
                  .filter((t) => t.stage === col.key)
                  .map((t) => (
                    <motion.li
                      key={t.id}
                      layout={!reduced}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-md border border-border bg-surface-2 px-2 py-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-[11px] text-fg">
                          {t.label}
                        </span>
                        {t.stage === "completed" && (
                          <span className="text-accent" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </div>
                      {t.stage === "processing" && (
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border">
                          <motion.div
                            className="h-full bg-warn"
                            initial={false}
                            animate={{ width: `${t.progress}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      )}
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
