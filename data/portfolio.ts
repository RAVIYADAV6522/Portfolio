export const siteConfig = {
  name: "Ravi Yadav",
  metaTitle: "Ravi Yadav | AI/ML Researcher · IEEE APPEEC 2026 Co-Author",
  metaDescription:
    "AI undergraduate (B.Tech '27) at Newton School of Technology building intelligent, scalable systems. Co-author of a physics-informed load forecasting paper at IEEE APPEEC 2026, Singapore.",
  email: "yadavr74839@gmail.com",
  /** File must live in `public/` with this exact name. Commit + push so Vercel serves it. */
  resumePath: "/RaviYadav_Resume.pdf",
  /** Bump this every time you replace the PDF (same filename) so the link changes and caches invalidate. */
  resumeCacheKey: "5",
  /** Photo in `public/` — e.g. `/profile.jpeg` or `/profile.png` (square, ≥256×256 recommended). */
  profileImage: "/profile-photo.jpg",
  social: {
    github: "https://github.com/RAVIYADAV6522",
    linkedin: "https://www.linkedin.com/in/ravi-y-963457363/",
    leetcode: "https://leetcode.com/u/ravi_yadav6522/",
  },
};

export const hero = {
  greeting: "Hi, I'm Ravi Yadav 👋",
  /** Primary intro (shown below the greeting) */
  summaryLine:
    "Building Intelligent, Scalable Systems | AI/ML Researcher | IEEE APPEEC 2026 Co-Author",
};

export const about = {
  introParagraphs: [
    "I'm an AI undergraduate (B.Tech, 2023–2027) and AI/ML researcher interested in a simple question: how do we build intelligent systems that work reliably in the real world, not just on a dataset?",
    "My current research explores deep learning for energy and physical systems, where models need to respect the underlying laws of the system rather than simply fit patterns in data. I'm the second of five authors on a physics-informed load forecasting paper presented at IEEE APPEEC 2026 in Singapore, as part of my ongoing work on power-grid forecasting and optimization.",
    "Beyond ML research, I enjoy understanding how systems are built from the ground up — from backend engineering and APIs to high-level design, system architecture, scalability, and reliability. I'm also deepening my foundations in NLP and computer vision, while competitive programming keeps my algorithmic and mathematical thinking sharp.",
  ],
  closingParagraphs: [
    "Long term, I'm interested in graduate research at the intersection of machine learning, physical systems, and infrastructure, while continuing to build scalable software along the way. Always happy to connect over research ideas, interesting systems, or opportunities to build something meaningful.",
  ],
};

export type WorkEntry = {
  company: string;
  role: string;
  dates: string;
  logo: string;
  location?: string;
  bullets: string[];
};

export const workExperience: WorkEntry[] = [
  {
    company: "Algocept",
    role: "Software Engineer Intern",
    dates: "January 2025 – April 2025 · 4 mos",
    location: "Noida, Uttar Pradesh, India · Remote",
    logo: "AC",
    bullets: [
      "Improved a React.js and Tailwind CSS admin dashboard by resolving 20+ UI/UX and responsiveness issues, delivering a more consistent cross-device experience.",
      "Developed a RESTful API supporting 3 country-specific configurations using NestJS, TypeScript, and MongoDB, enabling dynamic footer content.",
      "Optimized admin dashboard loading for 500+ users by implementing pagination, reducing initial load time by ~50% while limiting each request to 5 users.",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  location?: string;
  dates: string;
  grade: string;
};

export const educationEntries: EducationEntry[] = [
  {
    degree: "Bachelor of Technology (Artificial Intelligence)",
    institution: "Newton School of Technology, Rishihood University",
    location: "Delhi NCR, India",
    dates: "2023 – 2027",
    grade: "7.05 / 10.0",
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "Malviya Convent School",
    location: "Jaipur, Rajasthan",
    dates: "2021 – 2022",
    grade: "83.0%",
  },
  {
    degree: "Matriculation (Class X)",
    institution: "St. Edmund's School",
    location: "Jaipur, Rajasthan",
    dates: "2019 – 2020",
    grade: "91.1%",
  },
];

export type Award = {
  title: string;
  org: string;
  year: string;
  description: string;
};

export const honorsAwards: Award[] = [
  {
    title: "JEE Advanced '23 — AIR 6522",
    org: "Issued by IIT Delhi",
    year: "Jun 2023",
    description:
      "Secured All India Rank (AIR) 6522 in JEE (Advanced) 2023 among more than 185,000 candidates. Score: 142/360. OBC-NCL category rank: 1390.",
  },
  {
    title: "JEE Mains '23 — AIR 24875",
    org: "Issued by NTA (National Testing Agency)",
    year: "Apr 2023",
    description:
      "Secured All India Rank (AIR) 24875 in JEE Main 2023 with a 97.84 percentile. OBC-NCL category rank: 6397.",
  },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skillsByCategory: SkillCategory[] = [
  {
    category: "ML & AI",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Computer Vision",
      "Time Series Forecasting",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    category: "Generative AI",
    items: [
      "LLMs",
      "RAG",
      "LangChain",
      "LangGraph",
      "OpenAI API",
    ],
  },
  {
    category: "Languages & Scientific Computing",
    items: [
      "Python",
      "SQL",
      "JavaScript",
      "TypeScript",
      "Java",
      "OOP",
      "NumPy",
      "Pandas",
      "Matplotlib",
    ],
  },
  {
    category: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Prisma ORM",
    ],
  },
  {
    category: "Web, Backend & Tools",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "REST APIs",
      "System Design",
      "Git/GitHub",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Swagger",
      "UI/UX",
    ],
  },
  {
    category: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "Problem-solving",
    ],
  },
  {
    category: "Soft skills",
    items: [
      "Research",
      "Teamwork",
      "Communication skills",
    ],
  },
];

export type Certification = {
  title: string;
  provider: string;
  date: string;
  description: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    title: "Ethical Hacking",
    provider: "Coursera",
    date: "May 2025",
    description:
      "Completed hands-on training in ethical hacking, focusing on identifying vulnerabilities, penetration testing, and securing systems against cyber threats.",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/badge/lf4d1CXRRT6-HdQl0aU-jg",
  },
  {
    title: "DSA Course",
    provider: "Apna College",
    date: "October 2023",
    description:
      "Completed a hands-on DSA course, enhancing problem-solving skills, code optimization, and foundational knowledge in algorithms.",
    credentialUrl:
      "https://drive.google.com/file/d/1yg821bmcrDgt8Xcaw3fYmGu4Qfq_RraK/view",
  },
];

export type Publication = {
  title: string;
  /** Author list in citation order; names matching `siteConfig.name` are bolded. */
  authors?: string[];
  /** Venue / status line shown under the authors. */
  status: string;
  bullets?: string[];
  githubUrl: string;
  githubLabel?: string;
};

export const publications: Publication[] = [
  {
    title: "KAT-PatchTST: Physics-Informed Forecasting with Kirchhoff Conservation",
    authors: ["C. Murali Madhav", "Ravi Yadav", "K. Mehra", "A. Tewary", "S. Aggarwal"],
    status:
      "18th Asia Pacific Power and Energy Engineering Conference (APPEEC), Singapore · August 2026 · IEEE · Paper ID 190",
    bullets: [
      "Accepted and presented at IEEE APPEEC 2026; conference proceedings publication pending.",
      "Stage 1 of the Watt-IF research project; Stages 2 and 3 under active development, targeting ICML.",
      "Provisional patent filed.",
    ],
    githubUrl: "https://github.com/HackHeroic/Watt-IF",
    githubLabel: "Watt-IF on GitHub",
  },
];

export type ProjectCategory = "ai" | "fullstack" | "systems";

/** Which animated mini-illustration the project card shows. */
export type ProjectVisualKind =
  | "grid"
  | "options"
  | "files"
  | "snake"
  | "search"
  | "forest";

export const projectCategories: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "fullstack", label: "Full-stack" },
  { id: "systems", label: "Systems" },
];

export type Project = {
  title: string;
  categories: ProjectCategory[];
  visual: ProjectVisualKind;
  /** Shown as the big card at the top of the grid. */
  featured?: boolean;
  tags: string[];
  /** Resume-style impact bullets; use at least three per project. */
  bullets: string[];
  githubUrl?: string;
  /** If set, the project card shows a "Demo" link next to GitHub. */
  demoUrl?: string;
  reportUrl?: string;
};

export const projects: Project[] = [
  
  {
    title: "Watt-IF – Electricity Data Mining and Grid Resilience Research",
    categories: ["ai"],
    visual: "grid",
    featured: true,
    tags: [
      "Python",
      "XGBoost",
      "Deep Learning",
      "TensorFlow",
      "Data Mining",
      "Graph Theory",
    ],
    githubUrl: "https://github.com/HackHeroic/Watt-IF",
    bullets: [
      "KAT-PatchTST (Stage 1, 2nd author): Developed a physics-informed BA-aggregate load forecasting framework combining Channel-Independent PatchTST, TimeXer cross-attention, Kirchhoff conservation regularization, and ReLoBRaLo dynamic loss balancing. Achieved 3.55% demand MAPE across six BAs on the EIA930 protocol using a 168-hour context window (30% shorter than the published 240-hour baseline) and approximately 0.6M parameters, making the model 3–10× leaner than comparators.",
      "Stage 2 (In Development): Extending the forecasting framework toward operational feasibility analysis over the BA interchange network to identify systemic bottlenecks and quantify node criticality from forecasted grid states.",
      "Stage 3 (In Development): Developing a conditional grid partitioning policy to minimize allocation failures under forecasted operating conditions, motivated by ORNL’s reported $121B annual cost of major U.S. power outages in 2024.",
    ],
  },
  
  {
    title: "PrepLens – Interview Knowledge Platform",
    categories: ["fullstack"],
    visual: "search",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Google OAuth",
      "REST API",
      "Vercel",
      "Render",
    ],
    githubUrl: "https://github.com/RAVIYADAV6522/PrepLens",
    demoUrl: "https://preplens-umber.vercel.app/",
    bullets: [
      "Built and deployed PrepLens, a full-stack interview knowledge platform for approximately 2,000 B.Tech students at NST, enabling company-specific preparation through a searchable archive of interview rounds, questions, and student experiences, designed to help students save 10+ hours of unstructured preparation.",
      "Owned end-to-end product development, including database design, Node.js/Express REST APIs, UI, authentication, search, filters, upvotes, bookmarks, user profiles, and admin moderation, helping students leverage peers’ previous interview experiences for targeted preparation.",
      "Implemented verified college-account authentication with anonymity controls, deployed through Vercel and Render, and integrated caching and 107 automated tests to support reliable, privacy-conscious knowledge sharing.",
    ],
  },
  {
    title: "ForestLens – Tree Crown Detection & Canopy Area Estimation",
    categories: ["ai"],
    visual: "forest",
    tags: [
      "Python",
      "PyTorch",
      "DeepForest",
      "Rasterio",
      "Streamlit",
      "Computer Vision",
      "Geospatial ML",
    ],
    githubUrl: "https://github.com/RAVIYADAV6522/forestlens",
    demoUrl: "https://forestlens-cujmcn43y5s8ev8vguauez.streamlit.app/",
    bullets: [
      "Built and deployed a geospatial ML web application for individual tree crown detection and canopy area estimation from high-resolution satellite imagery using DeepForest, Rasterio, and Streamlit.",
      "Diagnosed and fixed a hidden DeepForest tile-scale dependency that fragmented crowns across tile sizes, improving crown geometry consistency and pipeline reproducibility.",
      "Investigated native-resolution detection failures through documented scale matching, reaching 71 trees/ha with 5.2 m crowns while explicitly reporting uncertainty and withholding unsupported measurements.",
    ],
  },
  {
    title: "Optiforge Neural Options Pricing",
    categories: ["ai"],
    visual: "options",
    tags: [
      "Python",
      "LSTM",
      "GARCH",
      "Financial Modeling",
      "Deep Learning",
    ],
    githubUrl: "https://github.com/HackHeroic/optiforge",
    demoUrl: "https://optiforge.streamlit.app/",
    bullets: [
      "Built a neural options pricing stack with LSTM models benchmarked side-by-side against Black–Scholes for fair quantitative comparison.",
      "Layered in GARCH-style volatility and analytical pricing so classical and learned estimators can be evaluated on the same surfaces.",
      "Packaged a Streamlit demo for interactive exploration and faster iteration on model behavior and error profiles.",
    ],
  },


  {
    title: "AI-Powered File Organizer with OS-Level System Calls",
    categories: ["systems", "ai", "fullstack"],
    visual: "files",
    tags: [
      "C",
      "Operating Systems",
      "Next.js",
      "Node.js",
      "AI",
      "Semantic Search",
      "LLM",
      "Full Stack",
      "System Design"
    ],
    githubUrl: "https://github.com/HackHeroic/file_organizer",
    bullets: [
      "Connected low-level C system calls to a Next.js/Node full-stack app for file operations, natural-language commands, and cross-format semantic search (PDF, images, text).",
      "Implemented AI-assisted auto-tagging and a multi-step autonomous organizer with explicit safety rules and user confirmation for risky actions.",
      "Tuned the agent for predictable tool use and context limits so long-running organization tasks stay controllable in real directories.",
    ],
  },

  {
    title: "Snake Game OS with Custom Memory Allocator and Terminal Engine",
    categories: ["systems"],
    visual: "snake",
    tags: [
      "C",
      "Operating Systems",
      "Memory Management",
      "System Programming",
      "Data Structures",
      "Game Development",
      "Low Level Programming",
      "Terminal Rendering"
    ],
    githubUrl: "https://github.com/HackHeroic/Snake_game_os",
    bullets: [
      "Implemented a real-time terminal Snake game in C with custom string, math, screen, and input abstractions to stay close to the metal.",
      "Built a 64KB virtual memory allocator (first-fit + coalescing) and non-blocking keyboard input for smooth frame-by-frame play.",
      "Added multiple modes, obstacles, and persistent stats while keeping the binary footprint and runtime costs suitable for terminal constraints.",
    ],
  }


  
];

/** Each item renders as "**Lead:** detail" — the text before the first ": " is bolded. */
export const achievementsAndActivities: string[] = [
  "IEEE PES Energy Shark Tank 2026 (18th APPEEC, Singapore): FlexGrid pitch selected among the Top 5 in the IEEE PES YP Industry Innovation Session; awarded a Certificate of Achievement for the most outstanding innovative solution and placed 3rd overall.",
  "1st Place, NST Startup Foundry 2026: Won with Jarvis, an AI-powered personal intelligence system, pitched to Google Cloud and Microsoft for Startups.",
  "Mentorship: Mentored 10+ students in Data Structures & Algorithms.",
  "IEEE Student Member (2026): Student Member in good standing.",
  "Jaipur Under-16 Cricket Team: Represented Jaipur as an opening batsman and part-time wicketkeeper.",
  "More Than Me: Volunteer supporting children in need.",
];

export const contact = {
  heading: "Get In Touch",
  subheading:
    "I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open!",
  cta: "Say Hello →",
};

/** Shapes for props — `app/page.tsx` (Server Component) passes these in so edits to this file re-render the UI via fresh server output. */
export type SiteConfig = typeof siteConfig;
export type HeroContent = typeof hero;
export type AboutContent = typeof about;
export type ContactContent = typeof contact;
