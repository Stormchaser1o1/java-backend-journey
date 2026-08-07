// Single source of truth for the dashboard. Update this alongside PROGRESS.md
// at the end of every session — the app renders straight from it.
const progress = {
  meta: {
    title: "Java Backend Journey",
    repo: "https://github.com/Stormchaser1o1/java-backend-journey",
    startedOn: "2026-08-07",
    lastSession: "2026-08-07",
    dayNumber: 6,
    streakDays: 6,
    overallProgressPercent: 5.5,
  },
  nextAction: {
    phase: "Phase 1 — Java Fundamentals",
    module: "M1 — Setting Up and Writing Your First Real Java Program",
    description:
      "Full Q&A rigor resumes here. Project structure, writing and running actual .java files, and translating Day 006's FindLargest/SumToN pseudocode into working Java.",
  },
  currentPhaseId: "p1",
  phases: [
    {
      id: "p0",
      name: "Phase 0 — Computer Fundamentals",
      state: "done",
      modules: [
        { id: "m1", name: "What is Programming? + CPU/RAM/Storage and the Fetch-Decode-Execute Cycle", done: true },
        { id: "m2", name: "Binary, Bits, Bytes and How Data is Represented", done: true },
        { id: "m3", name: "Compilers vs Interpreters, and the JVM (Hello.java → bytecode → CPU)", done: true },
        { id: "m4", name: "What is an Operating System? Processes, Memory, Files", done: true },
        { id: "m5", name: "How the Internet Works: Client, Server, Request, Response", done: true },
        { id: "m6", name: "Algorithms & Pseudocode — thinking before coding", done: true },
      ],
    },
    {
      id: "p1",
      name: "Phase 1 — Java Fundamentals",
      state: "current",
      modules: [
        { id: "m1", name: "Environment setup; first program; how compilation actually runs", done: false },
        { id: "m2", name: "Variables, data types, and literals", done: false },
        { id: "m3", name: "Operators (arithmetic, relational, logical, bitwise, assignment)", done: false },
        { id: "m4", name: "Type conversion, casting, and overflow in practice", done: false },
        { id: "m5", name: "Control flow: if/else, switch", done: false },
        { id: "m6", name: "Loops: for, while, do-while, break/continue", done: false },
        { id: "m7", name: "Arrays (1D and 2D)", done: false },
        { id: "m8", name: "Strings and the String pool", done: false },
        { id: "m9", name: "Methods: parameters, return types, overloading", done: false },
        { id: "m10", name: "Scanner/user input and putting it together", done: false },
        { id: "m11", name: "Project: Calculator (Phase 1 milestone)", done: false },
      ],
    },
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
    { topic: "P0-M2 Binary & Data Representation", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
    { topic: "P0-M3 Compilers, Interpreters, and the JVM", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
    { topic: "P0-M4 Operating Systems: Processes, Memory, Files", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
    { topic: "P0-M5 How the Internet Works", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
    { topic: "P0-M6 Algorithms & Pseudocode", taughtOn: "2026-08-07", nextRevision: "2026-08-08", label: "1-day recall" },
  ],
  weakAreas: [],
};

export default progress;
