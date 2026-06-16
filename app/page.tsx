import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MetricsStrip } from "@/components/MetricsStrip";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <MetricsStrip />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
