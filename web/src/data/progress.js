// Single source of truth for the dashboard. Update this alongside PROGRESS.md
// at the end of every session — the app renders straight from it.
const progress = {
  meta: {
    title: "Java Backend Journey",
    repo: "https://github.com/Stormchaser1o1/java-backend-journey",
    startedOn: "2026-08-07",
    lastSession: "2026-08-07",
    dayNumber: 1,
    streakDays: 1,
    overallProgressPercent: 0.5,
  },
  nextAction: {
    phase: "Phase 0 — Computer Fundamentals",
    module: "M2 — Inside the Machine (deep dive) + Binary",
    description:
      "Why computers use only 0 and 1, how a number/letter/image becomes bits, and what a ‘32-bit int’ actually means — the direct prerequisite for Java's data types in Phase 1.",
  },
  currentPhaseId: "p0",
  phases: [
    {
      id: "p0",
      name: "Phase 0 — Computer Fundamentals",
      state: "current",
      modules: [
        { id: "m1", name: "What is Programming? How Computers Think and Execute Instructions", done: true },
        { id: "m2", name: "Inside the Machine: CPU, RAM, Storage, and the Fetch-Decode-Execute Cycle (deep dive)", done: false },
        { id: "m3", name: "Binary, Bits, Bytes and How Data is Represented", done: false },
        { id: "m4", name: "Compilers vs Interpreters — and where Java sits", done: false },
        { id: "m5", name: "What is an Operating System? Processes, Memory, Files", done: false },
        { id: "m6", name: "How the Internet Works: Client, Server, Request, Response", done: false },
        { id: "m7", name: "Algorithms & Pseudocode — thinking before coding", done: false },
      ],
    },
    { id: "p1", name: "Phase 1 — Java Fundamentals", state: "upcoming", modules: [] },
    { id: "p2", name: "Phase 2 — Object-Oriented Programming", state: "upcoming", modules: [] },
    { id: "p3", name: "Phase 3 — Advanced Core Java", state: "upcoming", modules: [] },
    { id: "p4", name: "Phase 4 — Data Structures & Algorithms", state: "upcoming", modules: [] },
    { id: "p5", name: "Phase 5 — SQL & Databases", state: "upcoming", modules: [] },
    { id: "p6", name: "Phase 6 — Spring Framework", state: "upcoming", modules: [] },
    { id: "p7", name: "Phase 7 — Spring Boot", state: "upcoming", modules: [] },
    { id: "p8", name: "Phase 8 — Backend Engineering", state: "upcoming", modules: [] },
    { id: "p9", name: "Phase 9 — Low-Level Design", state: "upcoming", modules: [] },
    { id: "p10", name: "Phase 10 — High-Level Design Basics", state: "upcoming", modules: [] },
    { id: "p11", name: "Phase 11 — Git & GitHub", state: "upcoming", modules: [] },
    { id: "p12", name: "Phase 12 — Projects", state: "upcoming", modules: [] },
    { id: "p13", name: "Phase 13 — Interview Preparation", state: "upcoming", modules: [] },
  ],
  revisionDue: [
    { topic: "P0-M1 What is Programming", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
  ],
  weakAreas: [],
};

export default progress;
