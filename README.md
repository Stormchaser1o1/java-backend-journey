# Java Backend Engineer — Learning Journey

A day-by-day record of my path from zero programming knowledge to interview-ready Java Backend Engineer.

Started: **2026-08-07**

## Live dashboard

**https://stormchaser1o1.github.io/java-backend-journey/**

A React app (`web/`) that renders the roadmap, current phase/module, "up next",
revision schedule and weak areas straight from `web/src/data/progress.js`. It
auto-deploys to GitHub Pages via GitHub Actions on every push to `main` that
touches `web/`.

## Structure

```
java-backend-journey/
├── README.md                <- you are here
├── PROGRESS.md               <- markdown log: current phase, module, %, weak areas
├── notes/                    <- day-wise notes, one file per session
│   └── phase-00-computer-fundamentals/
├── code/                     <- every program I write, organised by phase
├── projects/                 <- full projects (Calculator -> E-Commerce Backend)
├── web/                       <- React dashboard (Vite), deployed to GitHub Pages
│   └── src/data/progress.js   <- structured data the dashboard renders from
└── .github/workflows/         <- CI: builds and deploys web/ to Pages
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
