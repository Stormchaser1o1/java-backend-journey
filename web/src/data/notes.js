// Condensed revision notes, one entry per completed module.
// These are the skimmable version of the full day-notes in /notes — the
// summary card plus the interview hits, so a morning review takes minutes.
// Keyed "<phaseId>:<moduleId>". Backticks in text render as inline code.
//
// When a module is taught: add its entry here alongside the full note file,
// PROGRESS.md and progress.js.

const REPO = 'https://github.com/Stormchaser1o1/java-backend-journey';
const NOTES_BASE = `${REPO}/blob/main/notes`;

const notes = {
  'p0:m1': {
    day: 1,
    path: 'phase-00-computer-fundamentals/day-001-what-is-programming.md',
    keyPoints: [
      'Computer = fast but literal. Human = smart but slow. Programming bridges the two.',
      '**Algorithm** = the recipe (language-independent). **Code** = that recipe written in a language. **Program** = an ordered list of instructions.',
      'CPU (brain) ↔ RAM (desk — fast, temporary, wiped on power-off) ↔ Storage (bookshelf — slow, huge, permanent). The CPU can only work on what is in RAM.',
      'The CPU loops forever: **Fetch → Decode → Execute**, with the Program Counter holding the address of the next instruction.',
      'Speed pyramid, fastest to slowest: Register → Cache → RAM → SSD → Network. Every optimisation you will ever learn is about climbing this pyramid.',
      'The computer does exactly what you **wrote**, not what you **meant** — the origin of ~90% of all bugs.',
    ],
    interview: [
      {
        q: 'Difference between an algorithm and a program?',
        a: 'Idea vs implementation. One algorithm can be written as many programs in many languages.',
      },
      {
        q: 'Difference between RAM and storage?',
        a: 'RAM is volatile, fast and small; storage is non-volatile, slow and large.',
      },
      {
        q: 'What is the fetch-decode-execute cycle?',
        a: "The CPU's endless loop: fetch the next instruction from RAM, decode what it means, execute it. The Program Counter tracks which address comes next.",
      },
    ],
  },

  'p0:m2': {
    day: 2,
    path: 'phase-00-computer-fundamentals/day-002-binary-and-data-representation.md',
    keyPoints: [
      'Binary is used for **electrical reliability** — two voltage states have a huge safe gap; ten states would silently corrupt on a small wobble.',
      'Place values are powers of the base. Binary: `128 64 32 16 8 4 2 1`.',
      '`n` bits → `2^n` values. A byte = 8 bits = 256 values. 1 KB = 1024 bytes = `2^10`.',
      "Text → ASCII/Unicode (`'A'` = 65). Images → RGB bytes. Everything is ultimately bytes.",
      'Bits carry **no inherent meaning** — the data type decides how to read them. That is what `int`/`char`/`double` really are.',
      "Two's complement: the leftmost bit is the sign bit. Signed `n` bits → −2^(n−1) … 2^(n−1)−1.",
      '`int` = 32 bits → max **2,147,483,647**. Overflow wraps silently to negative, with no warning.',
    ],
    interview: [
      {
        q: 'Why is `Integer.MAX_VALUE` 2,147,483,647?',
        a: '32-bit signed integer: one bit for the sign, so the max is `2^31 − 1`.',
      },
      {
        q: 'What is `Integer.MAX_VALUE + 1`?',
        a: '`Integer.MIN_VALUE` (−2,147,483,648). Silent overflow — Java throws no exception. Use `Math.addExact()` to detect it.',
      },
      {
        q: 'Why is a Java `char` 2 bytes when C’s is 1?',
        a: "Java uses UTF-16 to support Unicode; C's `char` is 1-byte ASCII-era.",
      },
    ],
  },

  'p0:m3': {
    day: 3,
    path: 'phase-00-computer-fundamentals/day-003-compilers-interpreters-jvm.md',
    keyPoints: [
      '**Compiler**: translates the whole program up front → fast to run, slow to start, catches errors early, output tied to one OS/CPU.',
      '**Interpreter**: translates line by line → instant start, slower execution, errors surface only when that line is reached.',
      'Java does **both**: `javac` compiles source → **bytecode**; the **JVM** interprets that bytecode and **JIT**-compiles hot paths to native machine code.',
      'Bytecode portability is the real mechanism behind "Write Once, Run Anywhere" — the same `.class` file runs on any OS with a JVM.',
      '**Compile-time** errors are caught by `javac` before running (syntax, types). **Run-time** errors only appear while executing (null, divide-by-zero, bad input).',
      '**JDK** = JRE + dev tools (`javac`). **JRE** = JVM + standard library. **JVM** = the engine that runs bytecode.',
    ],
    interview: [
      {
        q: 'Is Java compiled or interpreted?',
        a: 'Both. `javac` compiles source to bytecode; the JVM interprets that bytecode and JIT-compiles the hot parts to native code.',
      },
      {
        q: 'Why can a long-running Java server end up faster than C?',
        a: 'The JIT optimises using real runtime information — which branches are actually hot, which types actually appear — that an ahead-of-time compiler must guess at conservatively.',
      },
      {
        q: 'JVM vs JRE vs JDK?',
        a: 'JVM runs bytecode. JRE = JVM + standard library (to run Java). JDK = JRE + tools like `javac` (to write and compile Java).',
      },
    ],
  },

  'p0:m4': {
    day: 4,
    path: 'phase-00-computer-fundamentals/day-004-operating-systems.md',
    keyPoints: [
      'The OS mediates between every program and the hardware — memory, CPU, disk, network. Your code **never** touches hardware directly.',
      '**Program** = inert file on disk. **Process** = that program loaded and running, with its own PID and private memory.',
      '**Thread** = a worker inside a process. Threads in the same process **share memory** — powerful, but the source of race conditions.',
      '**Context switching**: the OS rapidly swaps which process/thread each core runs, creating the illusion of simultaneity.',
      '**Virtual memory**: each process believes it owns the whole address space; the OS secretly maps that to real RAM. This is *why* processes cannot read each other’s memory.',
      'Docker containers are OS processes with extra isolation — not mini virtual machines.',
    ],
    interview: [
      {
        q: 'Process vs thread?',
        a: 'A process has its own private memory and PID; threads live inside a process and share its memory. Processes are isolated but heavier; threads are light but can corrupt each other’s data.',
      },
      {
        q: 'On a 4-core CPU, can 8 threads run at literally the same instant?',
        a: 'No — only 4 (one per core). The rest are rapidly context-switched, which appears simultaneous but is not.',
      },
      {
        q: 'Why can’t one process read another’s memory?',
        a: 'Virtual memory — each process’s addresses are mapped to different real physical RAM, and the OS enforces the boundary.',
      },
    ],
  },

  'p0:m5': {
    day: 5,
    path: 'phase-00-computer-fundamentals/day-005-how-the-internet-works.md',
    keyPoints: [
      '**Client** asks, **server** answers — the model underlying all backend work.',
      '**DNS** translates a domain name (`google.com`) into an **IP address** — the internet’s phone book.',
      '**IP** addresses and routes packets; **TCP** makes that delivery reliable (ordering, confirmation, retransmission). Together: TCP/IP.',
      '**HTTP** is the shared vocabulary: a request (method + path + headers + body) gets a response (status code + headers + body).',
      'Status codes: `2xx` success, `3xx` redirect, `4xx` client error, `5xx` server error.',
      'A **backend** is just a long-running OS process that listens on a network port and answers HTTP requests instead of printing to a console.',
    ],
    interview: [
      {
        q: '`GET` vs `POST`?',
        a: '`GET` retrieves data and should not change server state (safe to repeat, cacheable). `POST` sends data to create/change something and is not safe to blindly repeat.',
      },
      {
        q: 'Why do we need both TCP and IP?',
        a: 'IP only handles addressing and routing, with no delivery guarantee. TCP adds reliability on top: ordering, confirmation and retransmission.',
      },
      {
        q: '`400` vs `500`?',
        a: '`400` means the client sent something invalid (client’s fault). `500` means the server failed while handling an otherwise valid request (your fault).',
      },
    ],
  },

  'p0:m6': {
    day: 6,
    path: 'phase-00-computer-fundamentals/day-006-algorithms-and-pseudocode.md',
    keyPoints: [
      'An algorithm must be **finite, ordered, unambiguous, and terminating**.',
      '**Pseudocode** = structured English for pure logic — it isolates "solving the problem" from "writing the syntax".',
      'Every algorithm is built from exactly three blocks: **sequence** (top to bottom), **selection** (`IF`/`ELSE`), **iteration** (`WHILE`/`FOR`).',
      'Method: state the problem → list inputs/output → **solve one example by hand** → write pseudocode → dry-run against a *fresh* edge case.',
      '**Off-by-one errors** come from subtly wrong loop boundaries (`<` vs `<=`) — always dry-run the boundary.',
      '"Check X" is not a step. "If X, do A; else do B" is a step. A check with no branch is silently ignored.',
    ],
    interview: [
      {
        q: 'What are the three building blocks of any algorithm?',
        a: 'Sequence, selection (branching), and iteration (looping). Everything else is convenience built on top of these.',
      },
      {
        q: 'Is a process that never terminates still an algorithm?',
        a: 'No — termination is one of the four required properties. It is just a loop with no exit.',
      },
      {
        q: 'Why write pseudocode if you already know the language?',
        a: 'It forces you to fully solve the logic before also fighting syntax. Conflating the two is why beginners write code that compiles but is wrong.',
      },
    ],
  },

  'p1:m1': {
    day: 7,
    path: 'phase-01-java-fundamentals/day-007-first-java-program.md',
    keyPoints: [
      'For a `public` class, **the file name must exactly match the class name** — `Hello.java` for `public class Hello`. Compiler rule, not style.',
      '`public static void main(String[] args)` is the entry point the **JVM** looks for — *not* the compiler. The compiler does not care whether `main` exists.',
      '**`main` is a run-time requirement.** A file with no `main` compiles fine (exit 0, `.class` produced) and only fails at `java` with `Error: Main method not found`.',
      '**`javac` printing nothing means "no compile errors"** — Unix convention, no news is good news. Your program’s output appears only when you run `java`. Two steps, two kinds of output.',
      '`static` = belongs to the **class**, not an object. It does *not* mean "constant" (that is `final`).',
      '⚠️ **Java 25 (JEP 512)** also allows an *instance* `main` — even `void main()` with no `public`, `static` or args, and even a file with no class at all. But `public static void main(String[] args)` is what all real code and every interview uses.',
      '`javac Hello.java` → `Hello.class` (bytecode). Run with `java Hello` — **no** `.class` extension. Every statement ends with `;`.',
    ],
    interview: [
      {
        q: 'Can a Java file compile without a `main` method?',
        a: 'Yes — verified on JDK 25. `javac` only checks the code is valid; `main` is a **runtime** requirement. Running it gives `Error: Main method not found`, not a compile error.',
      },
      {
        q: 'Why must `main` be `static`?',
        a: 'Classically: the JVM must call it before any object exists, so there would be nothing to invoke it on. As of Java 25 (JEP 512) an instance `main` is also allowed and the JVM instantiates the class for you — but `public static void main(String[] args)` remains the standard form.',
      },
      {
        q: 'Why must the file name match the public class name?',
        a: 'The compiler enforces it for `public` classes so a class can always be located from its name alone. Exact error: `class Hello is public, should be declared in a file named Hello.java`.',
      },
    ],
  },

  'p1:m2': {
    day: 8,
    path: 'phase-01-java-fundamentals/day-008-variables-and-data-types.md',
    keyPoints: [
      'A **variable** is a named, typed box in RAM. The **type is a promise about how to read the bits** — enforced by the compiler, which is what *statically typed* means.',
      '**Declaration** (`int age;`) → **assignment** (`age = 25;`) → or both at once. The type is written **exactly once**; repeating it is an error. `=` means "put the right side into the left box", not equality.',
      '**8 primitives:** `byte`(8) `short`(16) `int`(32) `long`(64) `float`(32) `double`(64) `char`(16, **unsigned**) `boolean`(**size unspecified**). Default to `int` and `double`.',
      'Ranges come from Day 002: signed `n` bits → −2^(n−1) … 2^(n−1)−1. `byte` is **−128 … 127** — asymmetric because zero takes a slot on the positive side.',
      '**Literal defaults:** an undecorated whole number is an `int`; an undecorated decimal is a `double`. `L` and `f` override that. `long x = 3000000000;` fails at the *literal*, before the assignment is even considered.',
      "`'A'` = char (single quotes) · `\"A\"` = String (double quotes). `0b` = binary, `0x` = hex, and a **leading zero means octal** — `010` is 8, not 10.",
      "**Gotchas, all from Day 002:** overflow wraps silently (the carry lands in the sign bit); `0.1 + 0.2 != 0.3`; `7 / 2 == 3` (truncated, not rounded); `'A' == 65`, `'A' + 1` → `'B'`, `'a' - 'A'` == 32.",
      '**Local variables have no default value** — reading one before assignment is a compile error (*definite assignment*). Only *fields* default to 0/false/null.',
      "**`javac` runs in phases:** parse → type-check → flow analysis. A failure in an early phase **hides every later-phase error**, and any error at all means **no `.class` file is produced**. That's why 5 bugs reported as 1 → 3 → 1.",
      '**Never store money in `double`/`float`** — use `long` cents or `BigDecimal`. `var` (Java 10+) infers the type at *compile* time; it is not dynamic typing.',
    ],
    interview: [
      {
        q: 'Why does `0.1 + 0.2 != 0.3`?',
        a: "Binary floating point can't represent 0.1 exactly — it's an infinitely repeating fraction, like 1/3 in decimal. IEEE-754 stores the nearest approximation, and the error surfaces on comparison: the sum prints as `0.30000000000000004`.",
      },
      {
        q: 'What is the size of a `boolean` in Java?',
        a: '**Unspecified** — the JVM spec deliberately leaves it to the implementation. Anyone confidently answering "1 bit" is guessing.',
      },
      {
        q: 'Why does `long x = 3000000000;` fail but `3000000000L` work?',
        a: 'Undecorated integer literals are `int` literals. The compiler rejects it while *parsing the literal* (`error: integer number too large`), before it ever looks at the `long` on the left. The `L` suffix makes it a `long` literal.',
      },
      {
        q: 'What is the default value of an uninitialised local `int`?',
        a: 'It has none. The compiler tracks *definite assignment* and refuses to compile a read before a write: `variable total might not have been initialized`. Only **fields** get defaults (0/false/null).',
      },
      {
        q: 'Is `char` signed or unsigned?',
        a: 'Unsigned, 0–65535 — the only unsigned primitive in Java. It is genuinely a number: `(int) \'A\'` is 65.',
      },
      {
        q: 'Which type would you use for a money amount, and why not `double`?',
        a: '`long` holding cents, or `BigDecimal`. `double` cannot represent values like 499.99 exactly, and the rounding errors accumulate across quantity, tax and totals into invoices off by a cent.',
      },
    ],
  },
};

/** Full note on GitHub for a given entry. */
export function noteUrl(note) {
  return `${NOTES_BASE}/${note.path}`;
}

/** Revision note for a module, or undefined if it has not been taught yet. */
export function noteFor(phaseId, moduleId) {
  return notes[`${phaseId}:${moduleId}`];
}

export default notes;
