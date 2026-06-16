// Single source of truth for all portfolio content.
// Nothing here is invented beyond what was provided.

export const site = {
  name: "Prince Pandey",
  role: "Final-year B.Tech IT · Manipal University Jaipur",
  gradLine: "Expected July 2027 · CGPA 7.39 / 10.0",
  tagline:
    "Building production systems at the intersection of full-stack, backend, and AI agents.",
  targeting: "Software Development Internships — Full-Stack / Backend / AI Agent Dev",
  summary:
    "Final-year B.Tech IT student with 4 production-deployed platforms and 3 national hackathon finishes. Proficient in TypeScript, React, Next.js, Node.js, Python, and PostgreSQL.",
  url: "https://princepandey.dev",
} as const;

export const contact = {
  email: "princejsps12@gmail.com",
  linkedin: {
    label: "linkedin.com/in/prince-pandey-378145367",
    href: "https://www.linkedin.com/in/prince-pandey-378145367",
  },
  github: {
    label: "github.com/princejsps12-ux",
    href: "https://github.com/princejsps12-ux",
  },
  leetcode: {
    label: "leetcode.com/u/princeji585",
    href: "https://leetcode.com/u/princeji585",
  },
} as const;

export type Metric = {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 4, decimals: 0, prefix: "0", label: "Production platforms" },
  { value: 3, decimals: 0, prefix: "0", label: "National hackathons" },
  { value: 7.39, decimals: 2, label: "CGPA / 10.0" },
  { value: 27, decimals: 0, prefix: "'", label: "Expected graduation" },
];

export type ProjectKind = "devping" | "intervai" | "taskflow" | "tailortalk";

export type Project = {
  id: ProjectKind;
  index: string;
  name: string;
  tagline: string;
  stack: string[];
  live?: string;
  code: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: "devping",
    index: "01",
    name: "DevPing",
    tagline: "AI-Powered Uptime Monitoring SaaS",
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "Redis",
      "BullMQ",
      "PostgreSQL",
      "Prisma",
      "Groq (LLaMA 3.3)",
    ],
    live: "https://devping-web.onrender.com",
    code: "https://github.com/princejsps12-ux/Pulsewatch",
    highlights: [
      "Full-stack uptime monitoring: scheduled HTTP health checks, response-time tracking, incident logs, real-time downtime alerts.",
      "Redis-backed BullMQ scheduler/worker queue with auto-retries and simulated multi-region checks (us-east / eu-west) to cut false positives.",
      "AI anomaly detection via LLaMA 3.3 (Groq) surfacing low / medium / high downtime risk scores.",
      "JWT auth with multi-tenant isolation, Recharts dashboards, Resend email alerts, shareable status pages, and embeddable SVG status badges.",
    ],
  },
  {
    id: "intervai",
    index: "02",
    name: "InterVAI",
    tagline: "AI Mock Interview Platform",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Groq (LLaMA 3.3)",
      "Whisper",
      "MediaPipe",
    ],
    live: "https://intervai-puce.vercel.app",
    code: "https://github.com/princejsps12-ux",
    highlights: [
      "AI speaks interview questions aloud while Whisper transcribes voice answers in real time.",
      "LLaMA 3.3 via Groq generates questions and scores answers per-response.",
      "Live posture-coaching via MediaPipe running fully in-browser — zero data leaves the client.",
      "Streak tracking, an analytics dashboard with radar charts, and JWT auth built from scratch.",
    ],
  },
  {
    id: "taskflow",
    index: "03",
    name: "TaskFlow",
    tagline: "Full-Stack Task Management Platform",
    stack: [
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "Celery",
      "Redis",
      "JWT (SimpleJWT)",
      "pytest",
      "React",
      "Vite",
    ],
    code: "https://github.com/princejsps12-ux/TaskFlow",
    highlights: [
      "Django REST Framework API + React/Vite dashboard with JWT auth and per-user data scoping.",
      "Async background processing via Celery + Redis driving a pending-to-completed task lifecycle.",
      "15-test pytest suite (auth, CRUD, filtering, analytics), SQLite-runnable for fast CI.",
      "Deployed on Render with Gunicorn, WhiteNoise, and production security hardening.",
    ],
  },
  {
    id: "tailortalk",
    index: "04",
    name: "TailorTalk",
    tagline: "Conversational AI Drive Agent",
    stack: [
      "FastAPI",
      "LangChain",
      "Gemini 1.5 Flash",
      "Google Drive API",
      "Streamlit",
      "Render",
    ],
    live: "https://tailortalk-frontend-fbsz.onrender.com",
    code: "https://github.com/princejsps12-ux/tailortalk",
    highlights: [
      "Conversational agent retrieving Google Drive files via natural-language queries (LangChain tool-calling + Gemini 1.5 Flash).",
      "Agent workflow with conversation memory for contextual follow-ups.",
      "Custom DriveSearchTool with typo correction and secure Drive access via service account.",
      "FastAPI backend with session management + rate limiting, Streamlit chat frontend.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Golang", "Python"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "TanStack Query", "Zustand", "TailwindCSS"],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Django",
      "Django REST Framework",
      "Gin",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Prisma ORM", "GORM", "Redis"],
  },
  {
    label: "AI / ML",
    items: [
      "LangChain",
      "LLM Integration (Groq, Gemini, LLaMA 3.3)",
      "Prompt Engineering",
    ],
  },
  {
    label: "Tools & Platforms",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Render"],
  },
];

export type Achievement = {
  title: string;
  org: string;
  year: string;
  placement: string;
};

export const achievements: Achievement[] = [
  {
    title: "GFG Vultr Hackathon",
    org: "GeeksforGeeks × Vultr",
    year: "2024",
    placement: "Finalist",
  },
  {
    title: "MUJ HackX",
    org: "Manipal University Jaipur",
    year: "2024",
    placement: "Finalist",
  },
  {
    title: "Smart India Hackathon",
    org: "Govt. of India",
    year: "2023",
    placement: "Runner-up",
  },
];
