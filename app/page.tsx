import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { AchievementsActivities } from "@/components/AchievementsActivities";
import { Hero } from "@/components/Hero";
import { HonorsAwards } from "@/components/HonorsAwards";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ResearchPublications } from "@/components/ResearchPublications";
import { Certifications } from "@/components/Certifications";
import { Skills } from "@/components/Skills";
import { WorkExperience } from "@/components/WorkExperience";

export default function Home() {
  return (
    <div className="bg-dot-grid min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden">
      <main className="pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
        <Hero />
        <About />
        <WorkExperience />
        <Education />
        <HonorsAwards />
        <Skills />
        <Certifications />
        <ResearchPublications />
        <Projects />
        <AchievementsActivities />
        <Contact />
      </main>
      <Navbar />
    </div>
  );
}
