import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" aria-hidden="true" />
      <div className="relative text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-danger/30 bg-danger/5 px-3.5 py-1.5">
          <span className="h-2 w-2 rounded-full bg-danger" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-danger">
            endpoint not found
          </span>
        </div>

        <h1 className="mt-6 font-mono text-7xl font-bold tracking-tight">404</h1>
        <p className="mt-3 text-muted">
          This route returned a <span className="font-mono text-danger">404</span>.
          The page you requested isn&apos;t in service.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to home
        </Link>
      </div>
    </main>
  );
}
