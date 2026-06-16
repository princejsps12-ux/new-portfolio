"use client";

import { useEffect, useRef, useState } from "react";

type UseRevealOptions = {
  /** Fraction of the element visible before it counts as revealed. */
  threshold?: number;
  /** Margin around the root (e.g. trigger slightly before the element enters). */
  rootMargin?: string;
  /** Reveal only once, then stop observing. Defaults to true. */
  once?: boolean;
};

/**
 * The shared reveal primitive used across the whole site.
 *
 * Wraps a single IntersectionObserver and reports whether the target has
 * entered the viewport. Components pair this with Framer Motion (or plain CSS)
 * to drive enter animations. Pausing offscreen simulations also hangs off this.
 *
 * Returns a `ref` to attach and the boolean `inView`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true } =
    options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No IntersectionObserver (very old browsers / test env): show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
