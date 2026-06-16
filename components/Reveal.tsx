"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger delay in seconds (e.g. index * 0.08). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Fade + slide-up on scroll-in, built on the shared `useReveal` hook.
 * Collapses to an instant, motionless show when reduced motion is requested.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  as = "div",
  ...rest
}: RevealProps) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as any;
    return <Tag {...(rest as any)}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
