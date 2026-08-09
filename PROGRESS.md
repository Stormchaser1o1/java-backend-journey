# Progress Dashboard

> Markdown log, kept in sync with `web/src/data/progress.js` (the live dashboard's data source).
> Live version: https://stormchaser1o1.github.io/java-backend-journey/
> Update this file AND `web/src/data/progress.js` at the end of every session,
> then run `cd web && npm run deploy` to publish the site.

---

## ▶ RESUME HERE (read this first in a new session)

**Next action:** Teach **Phase 1 · Module 2 — Variables, Data Types, and Literals.**
Nothing is pending from the user. M1 is fully reviewed and closed.

**Where we are:** Phase 0 complete (Days 001–006). Phase 1 M1 complete (Day 007). Next note file is
`notes/phase-01-java-fundamentals/day-008-variables-and-data-types.md`, next code dir is
`code/phase-01-java-fundamentals/m2-variables/`.

**Teaching loop (strict order, do not reorder):**
1. Teach the module — 10-step order, ending with Interactive Check + Debugging Exercise + Homework.
2. User answers → **review and correct thoroughly, then STOP.** Do not publish, do not advance.
3. User says "publish" → update this file + `web/src/data/progress.js` + `web/src/data/notes.js`,
   write the day note, commit + push to `main`, then `cd web && npm run deploy`.
4. After publishing → immediately start the next module, no confirmation needed.

**Standing rules:**
- The user is a beginner; assume nothing, explain every keyword, use analogies and ASCII diagrams.
- Never give a full solution immediately — Hint Mode: think → hint 1 → hint 2 → hint 3 → solution.
- Commit messages: plain, **no `Co-Authored-By` trailer**.
- JDK on this machine is **25.0.3** — verify language claims by actually running code before teaching
  them. Java 25 has instance `main` (JEP 512), which invalidates several textbook explanations.
- PowerShell is a new process per tool call; refresh PATH before `git`/`gh`/`npm`:
  `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`

**Carry-over from Day 007 (optional, not blocking):** hands-on homework items 1–4 — type/compile/run
`Hello.java`, print own name, delete a semicolon and read the exact error, rename `main` and observe.
These directly target the recorded weak area below.

---

**Last session:** 2026-08-09 (Day 007)
**Current Phase:** Phase 1 — Java Fundamentals
**Current Module:** Module 2 — Variables, Data Types, and Literals
**Status:** M1 complete — Q&A reviewed, 4/4 on the debugging exercise. Awaiting go-ahead for M2.
**Overall progress:** ~6.5%

**Phase 0 — Computer Fundamentals: COMPLETE** (6/6 modules, Days 001-006)
**Format note:** Phase 1 onward resumes full Q&A — Interactive Check, Debugging Exercise, and Homework are back.

---

## Phase checklist

### Phase 0 — Computer Fundamentals
_Module list revised after Day 002 — "Inside the Machine" (CPU/RAM/Fetch-Decode-Execute) was taught as part of M1, not as a separate module._
_No quiz / debugging exercise / homework for Phase 0 modules (user request, 2026-08-07) — teach and move on. Full Q&A resumes at Phase 1._
- [x] M1  What is Programming? + CPU/RAM/Storage and the Fetch-Decode-Execute Cycle
- [x] M2  Binary, Bits, Bytes and How Data is Represented
- [x] M3  Compilers vs Interpreters, and the JVM (Hello.java → bytecode → CPU)
- [x] M4  What is an Operating System? Processes, Memory, Files
- [x] M5  How the Internet Works: Client, Server, Request, Response
- [x] M6  Algorithms & Pseudocode — thinking before coding

### Phase 1 — Java Fundamentals — IN PROGRESS
_Full Q&A resumes here: Interactive Check, Debugging Exercise, and Homework on every module._
- [x] M1  Setting up the environment; your first program; how compilation actually runs _(Q&A reviewed; note corrected for Java 25 instance-main)_
- [ ] M2  Variables, data types, and literals
- [ ] M3  Operators (arithmetic, relational, logical, bitwise, assignment)
- [ ] M4  Type conversion, casting, and overflow in practice
- [ ] M5  Control flow: if/else, switch
- [ ] M6  Loops: for, while, do-while, break/continue
- [ ] M7  Arrays (1D and 2D)
- [ ] M8  Strings and the String pool
- [ ] M9  Methods: parameters, return types, overloading
- [ ] M10  Scanner/user input and putting it together
- [ ] M11  Project: Calculator (Phase 1 milestone)
### Phase 2 — Object-Oriented Programming — not started
### Phase 3 — Advanced Core Java — not started
### Phase 4 — Data Structures & Algorithms — not started
### Phase 5 — SQL & Databases — not started
### Phase 6 — Spring Framework — not started
### Phase 7 — Spring Boot — not started
### Phase 8 — Backend Engineering — not started
### Phase 9 — Low-Level Design — not started
### Phase 10 — High-Level Design Basics — not started
### Phase 11 — Git & GitHub — not started
### Phase 12 — Projects — not started
### Phase 13 — Interview Preparation — not started

---

## Revision due
| Topic | Taught on | Next revision |
|-------|-----------|---------------|
| P0-M1 What is Programming | 2026-08-07 | 2026-08-08 (1-day recall) |
| P0-M2 Binary & Data Representation | 2026-08-07 | 2026-08-08 (1-day recall) |
| P0-M3 Compilers, Interpreters, and the JVM | 2026-08-07 | 2026-08-08 (1-day recall) |
| P0-M4 Operating Systems: Processes, Memory, Files | 2026-08-07 | 2026-08-08 (1-day recall) |
| P0-M5 How the Internet Works | 2026-08-07 | 2026-08-08 (1-day recall) |
| P0-M6 Algorithms & Pseudocode | 2026-08-07 | 2026-08-08 (1-day recall) |
| P1-M1 First Java Program (+ compile vs run) | 2026-08-07 | 2026-08-10 (weak area — revisit) |

## Weak areas
| Area | Evidence | Fix |
|------|----------|-----|
| **Compile-time vs run-time** | Day 007 Q1 said `main` tells the *compiler* where to start (it's the JVM, at run time). Q4 read `javac` silence as "the program printed nothing" (it means "no compile errors"). | Re-read Day 007 §4b — four live experiments on this machine settle it. Revisit before Phase 1 M4. |
| Writing every step explicitly | Day 001 ATM exercise: knew the balance check was needed, described it, but never wrote it as a step; "check PIN" had no branch. | Improving — Day 007 debugging exercise was 4/4. Keep dry-running edge cases. |

## Environment TODO
- [x] Install Git (`winget install --id Git.Git -e`)
- [x] Create GitHub repo `java-backend-journey` and push
- [x] JDK 25.0.3 verified working
- [x] Install Node.js LTS (`winget install --id OpenJS.NodeJS.LTS -e`)
- [x] Build React dashboard (`web/`) and wire up GitHub Actions deploy to Pages
