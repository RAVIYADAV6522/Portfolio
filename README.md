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

### Option A — Vercel (recommended for Next.js)

1. **Push this project to GitHub** (or GitLab / Bitbucket):

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   gh repo create portfolio --private --source=. --push
   ```

   Or create an empty repo in the browser, then:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
   - **Framework Preset:** Next.js (auto-detected).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** leave default (Next.js handles this).

3. **Environment variable**
   - **Settings → Environment Variables**
   - Name: `NEXT_PUBLIC_SITE_URL`
   - Value: your production URL, e.g. `https://your-project.vercel.app` (use your real domain after the first deploy; update if you add a custom domain).
   - Enable for **Production** (and **Preview** if you want correct OG URLs on PR previews).
   - Redeploy after saving.

4. **Deploy** — Vercel builds on every push to `main`.

**CLI (optional):** install [Vercel CLI](https://vercel.com/docs/cli), run `npm i -g vercel`, then from the project folder run `vercel` and follow the prompts (links the folder to a project and deploys).

### Option B — Other hosts

Any platform that runs **Node.js** and supports **Next.js** (e.g. Netlify with the Next runtime, Railway, Render) needs:

- Install: `npm ci` or `npm install`
- Build: `npm run build`
- Start: `npm run start` (not `next dev`)

Set `NEXT_PUBLIC_SITE_URL` in that platform’s env UI the same way as on Vercel.

---

Built with Next.js and Tailwind.
