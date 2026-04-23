export const siteConfig = {
  name: "Ravi Yadav",
  metaTitle: "Ravi Yadav | AIR 6522 JEE Advanced '23 · Data Mining & Deep Learning",
  metaDescription:
    "Computer Science undergraduate (CSE '27) at Newton School of Technology. Data mining researcher, deep learning engineer, and competitive programmer — Jaipur, India.",
  email: "yadavr74839@gmail.com",
  /** File must live in `public/` with this exact name. Commit + push so Vercel serves it. */
  resumePath: "/RaviYadav_Resume.pdf",
  /** Bump this every time you replace the PDF (same filename) so the link changes and caches invalidate. */
  resumeCacheKey: "4",
  /** Photo in `public/` — e.g. `/profile.jpeg` or `/profile.png` (square, ≥256×256 recommended). */
  profileImage: "/profile.jpeg",
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
    "Building intelligent systems through algorithms, AI/ML, and data-driven research. Passionate about solving complex problems with efficient and scalable solutions. AIR 6522 in JEE Advanced 2023.",
  /** Secondary line: school & focus areas */
  metaLine:
    "B.Tech CSE @ Newton School of Technology | Exploring competitive programming, machine learning, and research.",
};

export const about = {
  introParagraphs: [
    "I'm a Computer Science undergraduate at Newton School of Technology (Batch '27), working at the intersection of algorithms, backend engineering, and machine learning.",
    "Competitive programming taught me to think precisely under constraints. Backend engineering taught me to build systems that scale. ML gives me a space to experiment and understand how things work beneath the surface — not just make them run.",
    "Outside of building, I enjoy breaking down complex ideas into intuitive explanations, because clarity of thought and clarity of communication usually go hand in hand.",
  ],
  closingParagraphs: [
    "Open to collaborating on backend architecture, algorithmic problems, or research in ML and data.",
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
    dates: "January 2025 – February 2025",
    location: "Remote",
    logo: "AC",
    bullets: [
      "Resolved critical UI/UX issues in a React.js + Tailwind CSS admin dashboard, improving responsiveness and reducing user-reported errors.",
      "Designed and deployed RESTful APIs using NestJS, TypeScript, and MongoDB, contributing to a scalable backend architecture.",
      "Optimized database queries and API response time, improving backend efficiency and ensuring seamless frontend–backend integration.",
    ],
  },
];

export type EducationEntry = {
  degree: string;
  institution: string;
  dates: string;
  grade: string;
};

export const educationEntries: EducationEntry[] = [
  {
    degree: "Bachelor of Technology (Artificial Intelligence)",
    institution: "Newton School of Technology, Rishihood University",
    dates: "2023 – 2027",
    grade: "7.13 / 10.0",
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "Malviya Convent School",
    dates: "2021 – 2022",
    grade: "83.0%",
  },
  {
    degree: "Matriculation (Class X)",
    institution: "St. Edmund's School",
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
  {
    title: "Under-16 Jaipur Cricket Team",
    org: "Jaipur district cricket",
    year: "2017 – 2018",
    description:
      "Member of the Jaipur Under-16 Cricket Team as an opening batsman and part-time wicket keeper.",
  },
];

export type SkillCategory = {
  category: string;
  items: string[];
};

export const skillsByCategory: SkillCategory[] = [
  {
    category: "Computer languages",
    items: [
      "Machine Learning",
      "TypeScript",
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "SQL",
    ],
  },
  {
    category: "Data tools",
    items: ["PostgreSQL", "TensorFlow", "NumPy"],
  },
  {
    category: "Software packages",
    items: [
      "Pandas",
      "Matplotlib",
      "Next.js",
      "Tailwind CSS",
      "Prisma ORM",
      "React",
      "Node.js",
      "Express JS",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    category: "Additional courses",
    items: ["Data Structure"],
  },
  {
    category: "Soft skills",
    items: ["Research", "Teamwork", "Communication skills"],
  },
  {
    category: "Others",
    items: [
      "Git and GitHub",
      "Firebase",
      "UI/UX",
      "Problem-solving",
      "OpenAI API",
      "Swagger",
      "Supabase",
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
  status: string;
  githubUrl: string;
};

export const publications: Publication[] = [
  {
    title: "Watt-IF: Electricity Data Mining and Grid Resilience Research",
    status: "Research project (work in progress) – 2025",
    githubUrl: "https://github.com/HackHeroic/Watt-IF",
  },
  {
    title: "Optiforge: Neural Options Pricing with LSTM and GARCH Volatility",
    status: "Research project (work in progress) – 2025",
    githubUrl: "https://github.com/HackHeroic/optiforge",
  },
];

export type Project = {
  title: string;
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
      "Mined large-scale consumption and generation data with XGBoost, TFT, and deep learning; improved demand forecasting with rigorous feature engineering.",
      "Modeled the U.S. power grid as a weighted directed graph and applied max-flow / min-cut analysis to surface critical transmission bottlenecks.",
      "Simulated cascading failure scenarios to support resilience analysis and more efficient long-term resource allocation across the network.",
    ],
  },
  
  {
    title: "Optiforge Neural Options Pricing",
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
    title: "Smart Commerce AI Agent",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "LLM",
      "Ollama",
      "AI Agents",
      "REST API",
      "Conversational AI",
      "System Design"
    ],
    githubUrl: "https://github.com/RAVIYADAV6522/Smart-Commerce-AI-Agent",
    demoUrl: "https://smart-commerce-ai-agent.vercel.app/",
    bullets: [
      "Engineered a conversational commerce platform (Express, React, Vite, Tailwind) with Ollama tool-calling to run search, cart, and checkout against a catalog-backed, decoupled API.",
      "Shipped hybrid intent routing: deterministic fast paths for low-latency turns plus a multi-step agent (up to 5 iterations) with structured JSON tool I/O for complex flows.",
      "Improved real-world performance: cut multi-step agent latency from ~20s to under ~10s and ~1s on fast paths; added validation, rate limiting, and bounded session context.",
    ],
  },

  {
    title: "Eats – Full-Stack Enterprise Food Delivery Ecosystem",
    tags: [
      "React",
      "Redux Toolkit",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Authentication",
      "REST API",
      "Full Stack Development",
      "Cloudinary"
    ],
    githubUrl: "https://github.com/Ranvendra/Eats",
    demoUrl: "https://eatindia.vercel.app/",
    bullets: [
      "Delivered end-to-end food delivery flows—authentication, restaurant browse, cart, checkout, and order tracking—on React, Redux Toolkit, TypeScript, Express, and MongoDB.",
      "Designed a modular, class-based backend with JWT auth, Mongoose data modeling, and versioned REST APIs for scalable feature growth.",
      "Polished UX with debounced cart synchronization, route-level lazy loading, and Cloudinary-backed media for menus and item imagery.",
    ],
  },

  {
    title: "AI-Powered File Organizer with OS-Level System Calls",
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

export const achievementsAndActivities: string[] = [
  "NST Startup Foundry 2026: Won 1st place for Jarvis, an AI-powered Personal Intelligence System pitched to Google Cloud and Microsoft for Startups.",
  "Mentored 10+ students in Data Structures and Algorithms, improving problem-solving skills and coding proficiency.",
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
