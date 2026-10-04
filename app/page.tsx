import { About } from "@/components/About";
import { Activity } from "@/components/Activity";
import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { ResumeModal } from "@/components/ResumeModal";
import { Toaster } from "@/components/Toaster";
import { AmbientEffects } from "@/components/AmbientEffects";
import { BackgroundCube } from "@/components/BackgroundCube";
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
import { TechMarquee } from "@/components/TechMarquee";
import { WorkExperience } from "@/components/WorkExperience";
import {
  about,
  achievementsAndActivities,
  certifications,
  contact,
  educationEntries,
  hero,
  honorsAwards,
  projects,
  publications,
  siteConfig,
  skillsByCategory,
  workExperience,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-dot-grid">
      <AmbientEffects />
      <BackgroundCube />
      <main className="relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
        <Hero hero={hero} siteConfig={siteConfig} />
        <TechMarquee skillsByCategory={skillsByCategory} />
        <About about={about} />
        <WorkExperience workExperience={workExperience} />
        <ResearchPublications publications={publications} />
        <Projects projects={projects} />
        <Education educationEntries={educationEntries} />
        <HonorsAwards honorsAwards={honorsAwards} />
        <Skills skillsByCategory={skillsByCategory} />
        <Certifications certifications={certifications} />
        <Activity siteConfig={siteConfig} />
        <AchievementsActivities
          achievementsAndActivities={achievementsAndActivities}
        />
        <Contact contact={contact} siteConfig={siteConfig} />
        <Footer siteConfig={siteConfig} />
      </main>
      <Navbar siteConfig={siteConfig} />
      <CommandPalette siteConfig={siteConfig} />
      <ResumeModal siteConfig={siteConfig} />
      <Toaster />
    </div>
  );
}
