import { About } from "@/components/About";
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
      <BackgroundCube />
      <main className="relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(6rem+env(safe-area-inset-bottom,0px))]">
        <Hero hero={hero} siteConfig={siteConfig} />
        <About about={about} />
        <WorkExperience workExperience={workExperience} />
        <Education educationEntries={educationEntries} />
        <HonorsAwards honorsAwards={honorsAwards} />
        <Skills skillsByCategory={skillsByCategory} />
        <Certifications certifications={certifications} />
        <ResearchPublications publications={publications} />
        <Projects projects={projects} />
        <AchievementsActivities
          achievementsAndActivities={achievementsAndActivities}
        />
        <Contact contact={contact} siteConfig={siteConfig} />
      </main>
      <Navbar siteConfig={siteConfig} />
    </div>
  );
}
