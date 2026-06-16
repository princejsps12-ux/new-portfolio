"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  text: string;
  /** ms per character. */
  speed?: number;
  /** ms before typing starts. */
  startDelay?: number;
  className?: string;
  onDone?: () => void;
};

/**
 * Types `text` out character-by-character with a blinking caret.
 * Reduced motion: renders the full string instantly (and fires onDone).
 */
export function Typewriter({
  text,
  speed = 70,
  startDelay = 250,
  className,
  onDone,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      setDone(true);
      onDone?.();
      return;
    }

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
    // Intentionally run once per text value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block w-[0.6ch] -translate-y-[2px] border-r-2 border-accent ${
          done ? "animate-caret" : ""
        }`}
      >
        &nbsp;
      </span>
    </span>
  );
}
