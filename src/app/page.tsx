import { Suspense } from "react";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getProjects } from "@/lib/github";
import { getCurrentYear } from "@/lib/time";

async function AboutWithData() {
  const [projects, year] = await Promise.all([getProjects(), getCurrentYear()]);
  return <About projectCount={projects.length} currentYear={year} />;
}

async function ProjectsWithData() {
  const projects = await getProjects();
  return <Projects projects={projects} />;
}

function ProjectsSkeleton() {
  return (
    <section id="projects" className="section-y">
      <div className="container-x">
        <div className="mx-auto mb-16 h-24 max-w-md animate-pulse rounded-xl bg-card" />
        <div className="mb-14 h-80 animate-pulse rounded-2xl bg-card" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-card" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<section id="about" className="section-y" />}>
        <AboutWithData />
      </Suspense>
      <Skills />
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsWithData />
      </Suspense>
      <Experience />
      <Contact />
    </>
  );
}
