# Portfolio — Ravi Yadav

Personal portfolio site built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **next-themes** (light/dark). Content is driven by typed data in `data/portfolio.ts`.

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (or use `pnpm` / `yarn` with equivalent commands)

## Setup

```bash
npm install
```

## Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build            |
| `npm run start` | Run production server (after `build`) |
| `npm run lint`  | ESLint                        |

## Customizing content

Almost all copy, links, and lists live in **`data/portfolio.ts`**:

- Site metadata, social URLs (GitHub, LinkedIn, LeetCode)
- Hero, About, education, internships, honors, skills, certifications
- Research publications, projects, achievements & activities
- Contact CTA and email

**Assets:**

- **`public/resume.pdf`** — resume opened from the Hero “resume” button
- **`public/avatar.svg`** (or replace with `avatar.jpg` and update `components/Hero.tsx`)

## Environment

Optional, for correct Open Graph / canonical URLs in production:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, metadata falls back to `http://localhost:3000` during development.

## Project structure

```
app/                 # App Router: layout, page, globals, opengraph-image
components/          # UI sections (Hero, About, Projects, Navbar, etc.)
data/portfolio.ts    # Single source of truth for portfolio content
lib/utils.ts         # `cn()` helper for class names
public/              # Static files (resume, avatar)
```

## Deployment

Deploy to **[Vercel](https://vercel.com)** (or any host that supports Next.js): connect the repo, set `NEXT_PUBLIC_SITE_URL`, and use the default build command `npm run build` with output directory `.next`.

---

Built with Next.js and Tailwind.
