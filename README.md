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
- **`public/profile.jpeg`** — Hero profile photo (or change `siteConfig.profileImage` in `data/portfolio.ts`). If the file is missing, the site falls back to `public/avatar.svg`. Use a square image (about 400×400px or larger) for best results.

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

## Layout

The UI uses responsive Tailwind breakpoints (`sm`, `md`, `lg`), a horizontally scrollable bottom nav on very narrow screens, safe-area padding for notched devices, and `min-h-[100dvh]` on the hero so mobile browser chrome doesn’t clip content.

## Deployment

Deploy to **[Vercel](https://vercel.com)** (or any host that supports Next.js): connect the repo, set `NEXT_PUBLIC_SITE_URL`, and use the default build command `npm run build` with output directory `.next`.

---

Built with Next.js and Tailwind.
