# Java Backend Engineer — Learning Journey

A day-by-day record of my path from zero programming knowledge to interview-ready Java Backend Engineer.

Started: **2026-08-07**

## Live dashboard

**https://stormchaser1o1.github.io/java-backend-journey/**

A React + Vite app in `web/` that renders the roadmap, current phase/module,
"up next", revision schedule and weak areas straight from
`web/src/data/progress.js`.

### Updating it

1. Edit `web/src/data/progress.js` (and mirror the change into `PROGRESS.md`).
2. Commit and push to `main` — that's the permanent record.
3. Publish the site:

   ```bash
   cd web
   npm run deploy      # lint → smoke test → build → push to gh-pages
   ```

Pages serves the prebuilt `gh-pages` branch. `.github/workflows/deploy.yml`
does the same thing in CI and is ready to take over — switch the repo's Pages
source back to "GitHub Actions" once custom workflows are enabled on the
account (they are currently held, while GitHub's own managed Pages build runs
fine).

### Working on the dashboard

```bash
cd web
npm install
npm run dev        # http://localhost:5173/java-backend-journey/
npm run smoke      # renders the app in jsdom, fails on any console error
npm run lint
```

## Structure

```
java-backend-journey/
├── README.md                  <- you are here
├── PROGRESS.md                <- markdown log: current phase, module, %, weak areas
├── notes/                     <- day-wise notes, one file per session
│   └── phase-00-computer-fundamentals/
├── code/                      <- every program I write, organised by phase
├── projects/                  <- full projects (Calculator -> E-Commerce Backend)
├── web/                       <- React dashboard (Vite)
│   ├── src/data/progress.js   <- the data the dashboard renders from
│   ├── src/styles/tokens.css  <- design tokens (colour, type, space, motion)
│   ├── src/components/ui/     <- reusable primitives
│   ├── src/hooks/             <- theme, scroll-reveal, count-up
│   ├── test/smoke.mjs         <- jsdom render check
│   └── scripts/deploy.mjs     <- publishes dist/ to the gh-pages branch
└── .github/workflows/         <- CI deploy (pending Actions being enabled)
```

## Roadmap

| Phase | Topic |
|-------|-------|
| 0  | Computer Fundamentals |
| 1  | Java Fundamentals |
| 2  | Object-Oriented Programming |
| 3  | Advanced Core Java |
| 4  | Data Structures & Algorithms |
| 5  | SQL & Databases |
| 6  | Spring Framework |
| 7  | Spring Boot |
| 8  | Backend Engineering |
| 9  | Low-Level Design |
| 10 | High-Level Design Basics |
| 11 | Git & GitHub |
| 12 | Projects |
| 13 | Interview Preparation |

## Environment

- OS: Windows 11
- JDK: 25.0.3 LTS
- Editor: VS Code
