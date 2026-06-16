# Prince Pandey — Developer Portfolio

A systems-console / monitoring-dashboard themed portfolio. Cool dark slate, a single
signal-green accent (`#4ADE80`), monospace for data and Inter for prose. Restrained,
precise, fast.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **TailwindCSS** (CSS-variable theming, dark default + light toggle)
- **Framer Motion** for scroll reveals and the live simulations
- Deployed on **Vercel**

## Features

- Hero with live status pill, typewriter name, animated grid/scanline
- Count-up metrics strip (IntersectionObserver)
- Four live, lightweight simulations:
  - **DevPing** — rAF latency monitor with incident markers + region toggle
  - **InterVAI** — canvas waveform, live transcript, radar chart
  - **TaskFlow** — Celery/Redis kanban pipeline loop
  - **TailorTalk** — looping chat → file-card result
- Expand/collapse project case studies, staggered tech badges, hover glow
- Drawing achievements timeline
- `/resume` route with print-to-PDF
- SEO meta + dynamic Open Graph image + sitemap/robots
- Accessible (semantic HTML, keyboard nav, visible focus) and
  `prefers-reduced-motion` respected on every animation

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
app/        routes, layout, OG image, sitemap/robots, 404, /resume
components/ sections + cards/ (the four simulations)
hooks/      useReveal, usePrefersReducedMotion  ← shared animation utilities
lib/        data.ts  ← single source of truth for all content
```

## Deploy

Push to GitHub and import into Vercel — zero config. Update `site.url` in
`lib/data.ts` to your production domain so OG/sitemap URLs resolve.
