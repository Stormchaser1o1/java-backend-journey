# Progress Dashboard

> Markdown log, kept in sync with `web/src/data/progress.js` (the live dashboard's data source).
> Live version: https://stormchaser1o1.github.io/java-backend-journey/
> Update this file AND `web/src/data/progress.js` at the end of every session,
> then run `cd web && npm run deploy` to publish the site.

---

## ▶ RESUME HERE (read this first in a new session)

**Next action:** Teach **Phase 1 · Module 7 — Arrays (1D and 2D).**
Nothing is pending from the user. M6 is fully reviewed, closed and published.

**Where we are:** Phase 0 complete (Days 001–006). Phase 1 M1–M6 complete (Days 007–012). Next note
file is `notes/phase-01-java-fundamentals/day-013-arrays.md`, next code dir is
`code/phase-01-java-fundamentals/m7-arrays/`.

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

**Carry-over from Days 008–009 (optional, not blocking):** `MyProfile.java` using all 8 primitives;
the three deliberate-error experiments; `Even.java` (ternary + `%`); the five division predictions;
`Bits.java` for `int x = 25`.

---

**Last session:** 2026-08-12 (Day 012)
**Current Phase:** Phase 1 — Java Fundamentals
**Current Module:** Module 7 — Arrays (1D and 2D)
**Status:** M6 complete — Q&A reviewed (Q1–Q3 correct; Q4/Q5 partial), **debugging exercise 4/4**
with `Stats.java` verified (`javac` exit 0, prints `sum = 55 … found = 21`). **"Submit only what you
have compiled" is now RESOLVED** — two clean, pre-compiled submissions in a row. Also: user
independently discovered the filename-case behaviour, investigated and written up as **§4d of the
Day 007 note**. Awaiting go-ahead for M7.
**Overall progress:** ~11.5%

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
- [x] M2  Variables, data types, and literals _(Q&A reviewed; 5/5 debugging; compiler-phase pipeline discovered by experiment)_
- [x] M3  Operators (arithmetic, relational, logical, bitwise, assignment) _(Q&A reviewed; bitwise 5/5; debugging 4/4)_
- [x] M4  Type conversion, casting, and overflow in practice _(Q&A reviewed; debugging solved over three attempts; cast placement recorded as a weak area)_
- [x] M5  Control flow: if/else, switch _(Q&A reviewed; debugging 4/4; arrow switch expression used unprompted)_
- [x] M6  Loops: for, while, do-while, break/continue _(Q&A reviewed; debugging 4/4; pre-compiled submission)_
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
| P1-M1 First Java Program (+ compile vs run) | 2026-08-07 | 2026-08-13 (weak area CLOSED — 3-day recall) |
| P1-M2 Variables, Data Types & Literals | 2026-08-10 | 2026-08-15 (3-day recall) |
| P1-M3 Operators | 2026-08-12 | 2026-08-13 (1-day recall) |
| P1-M4 Type Conversion, Casting & Overflow | 2026-08-12 | 2026-08-13 (1-day recall — cast placement) |
| P1-M5 Control Flow: if/else and switch | 2026-08-12 | 2026-08-13 (1-day recall) |
| P1-M6 Loops: for, while, do-while | 2026-08-12 | 2026-08-13 (1-day recall) |

## Weak areas
| Area | Evidence | Fix |
|------|----------|-----|
| **`=` assigns, it never checks** | Day 011, twice in one submission: Q4 explained `if (flag = true)` as "checks if the flag is true", and the debugging exercise kept `if (isMember = true)` while only adding braces around it. | Both `x = 5` and `flag = true` **assign**; the boolean one merely leaves a value of the type `if` demands, so the type system can't catch it. **Write `if (flag)`** — no operator, nothing to get wrong. |
| **Where the cast goes** | Day 010, four attempts. `(long)(a + b)` converts an already-overflowed `int`; `(byte) level + 1` is defeated by precedence (a cast binds tighter than `+`). Also: tried to attach `L` to an `int` *variable* — `L` is a literal suffix only. | **Widening casts an operand *before* the maths (`(long) a + b`); narrowing brackets the maths and shrinks *after* it (`(byte)(level + 1)`).** Put the cast wherever it prevents the loss. |
| ~~Submit only what you have compiled~~ | Four exercises in a row were sent without being run first, every one returning errors `javac` shows in seconds. | ✅ **RESOLVED on Days 011–012** — two pre-compiled submissions in a row, both correct first time. Keep the habit: paste → `javac` → read → fix → send. |
| Right answer, mechanism stated backwards | Day 009 Q2 described `++i` as "use 11, then increment" (it increments *first*, handing over 12); Q4 explained `&`'s crash as "checks right to left" (Java is **always** left to right). Both conclusions were correct. | Say the mechanism out loud and check it against a dry run — a right answer from wrong reasoning fails the follow-up question. |
| char arithmetic — `+1` vs `+32` | Day 008 Q3: answered `(char)('A' + 1)` as `'a'`. Right mechanism, wrong constant. | `+1` → next letter (`'B'`); `+32` → upper→lower case, the gap from the Day 002 ASCII table. |

## Weak areas — closed
| Area | Closed on | How |
|------|-----------|-----|
| **Compile-time vs run-time** | 2026-08-10 | Missed four times across Days 007–008, then closed by running two drills: a missing semicolon (`javac` fails at lex+parse, **no `.class` produced**) vs a renamed `main` (`javac` succeeds, `.class` exists, the **JVM** fails to find the entry point). Reading the explanation didn't work; running the experiment did. |

## Environment TODO
- [x] Install Git (`winget install --id Git.Git -e`)
- [x] Create GitHub repo `java-backend-journey` and push
- [x] JDK 25.0.3 verified working
- [x] Install Node.js LTS (`winget install --id OpenJS.NodeJS.LTS -e`)
- [x] Build React dashboard (`web/`) and wire up GitHub Actions deploy to Pages
