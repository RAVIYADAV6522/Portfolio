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

export type AboutJourneyItem = {
  title: string;
  /** Shown after an em dash; omit for a single-line bullet. */
  description?: string;
};

export const about = {
  introParagraphs: [
    "I'm a Computer Science undergraduate at Newton School of Technology (Batch '27), with AIR 6522 in JEE Advanced 2023.",
    "I like working at the intersection of algorithms, AI/ML, and research—basically where mathematical thinking turns into real systems.",
    "Competitive programming is where I built my core thinking: breaking down problems, writing efficient solutions, and understanding what actually works under constraints. Alongside that, I explore machine learning and deep learning by building, experimenting, and digging into how these systems work under the hood.",
  ],
  journeyHeading: "Right now, I spend most of my time on:",
  journeyItems: [
    { title: "Competitive Programming" },
    { title: "AI/ML + research" },
    { title: "Teaching concepts in a simple, intuitive way" },
  ] as AboutJourneyItem[],
  closingParagraphs: [
    "I'm always open to collaborating on interesting problems, research ideas, or projects in algorithms, data mining, and machine learning.",
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
  description: string;
  githubUrl?: string;
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
    description:
      "Conducted large-scale electricity consumption and generation mining using XGBoost, TFT, and deep learning models, achieving improved demand forecasting through advanced feature engineering. Modeled the U.S. power grid as a weighted directed graph and applied max-flow min-cut analysis to identify critical transmission bottlenecks and simulate cascading failure scenarios for Efficient Resource Allocation.",
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
    description:
      "Developed a neural option pricing system integrating LSTM models benchmarked against Black-Scholes for quantitative comparison. Analytical pricing.",
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
    description:
      "Developed a full-stack intelligent file management system combining low-level OS system calls in C with a Next.js web interface. Implemented natural language command execution, semantic search across PDFs/images/text, AI-based auto-tagging, and an autonomous agent for multi-step file organization with safety constraints and human-in-the-loop confirmation."
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
    description:
      "Built a real-time terminal-based Snake game in C from scratch, implementing custom OS-level libraries for memory management, string manipulation, math operations, screen rendering, and keyboard input. Designed a 64KB virtual memory allocator with first-fit and coalescing, non-blocking input handling, and dynamic gameplay with multiple modes, obstacles, and persistent statistics."
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
    githubUrl: "YOUR_GITHUB_LINK_HERE",
    description:
      "Engineered a full-stack food delivery platform using React, Redux Toolkit, TypeScript, Express, and MongoDB, implementing end-to-end flows for authentication, restaurant browsing, cart management, checkout, and order tracking. Designed a modular class-based backend architecture with JWT authentication, Mongoose data modeling, and RESTful APIs, and enhanced user experience with debounced cart synchronization, lazy loading, and cloud-based media handling."
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
