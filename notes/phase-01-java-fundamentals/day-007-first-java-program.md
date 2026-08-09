# Day 007 — Setting Up and Writing Your First Real Java Program

**Phase 1 · Module 1 · 2026-08-07**

> Prerequisite: all of Phase 0, especially [Day 003 — Compilers/JVM](../phase-00-computer-fundamentals/day-003-compilers-interpreters-jvm.md) and [Day 006 — Algorithms & Pseudocode](../phase-00-computer-fundamentals/day-006-algorithms-and-pseudocode.md)

---

## 1. Motivation

Six days ago you didn't know what a program was. Today you write and run one — and unlike most beginner tutorials, you're not doing this blind: you already know *exactly* what happens to every character you're about to type, because you built that understanding from first principles in Phase 0. That's a genuinely rare position for a first-day Java learner to be in.

---

## 2. The problem

You have a JDK installed (verified: **25.0.3 LTS**). You need to turn a `.java` text file into something the JVM will actually execute, and understand every single line you write — not copy-paste it.

---

## 3. The concept — anatomy of a minimal Java program

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Every keyword, explained — nothing assumed:

| Token | Meaning |
|---|---|
| `public` | An **access modifier**. Says "anything is allowed to see/use this." (Phase 2 covers the full set: `private`, `protected`, package-private.) |
| `class` | A keyword declaring a **class** — a blueprint. For now: think "a named container for your code." Phase 2 goes deep on what a class really is. |
| `Hello` | The class **name**. In Java, **the file name must exactly match the public class name** — this file must be `Hello.java`, capital H, no exceptions. This is a compiler rule, not a style preference. |
| `{ }` | Curly braces mark a **block** — everything belonging to the class, or to a method, is nested inside its own `{ }` pair. |
| `public static void main(String[] args)` | The **entry point**. When you run `java Hello`, the JVM looks specifically for a method with exactly this signature and starts execution there. Nothing runs before this line is found. |
| `static` | Means this method belongs to the **class itself**, not to any particular object of it. Historically this was *required* for `main`: at startup no object exists, so there was nothing to call the method *on*. **On Java 25 this is no longer strictly true** — see §4b. But `public static void main` remains the universal form in real code. (Full meaning in Phase 2.) |
| `void` | This method returns **nothing**. Contrast with methods that return a value (Module 9). |
| `main` | Not a keyword — just a method name. But it's the *specific* name the JVM is hardcoded to look for. Rename it and `java Hello` fails to find an entry point. |
| `(String[] args)` | A **parameter**: an array of `String`s, holding any command-line arguments passed after `java Hello`. Empty if you didn't pass any — but the parameter must still be declared. |
| `System.out.println(...)` | A method call. `System` is a built-in class, `out` is its output stream (connected to your console), `println` writes the text and moves to a new line afterward. |
| `"Hello, World!"` | A **String literal** — text data, always in double quotes in Java. |
| `;` | Every **statement** ends with a semicolon. Not optional, not stylistic — the compiler uses it to know where one instruction ends. |

### Compiling and running — connecting straight back to Day 003

```
   Hello.java  (you write this)
        |
        |   javac Hello.java
        v
   Hello.class  (bytecode — you don't read this, the JVM does)
        |
        |   java Hello   <-- note: no ".class" extension here
        v
   JVM: class loader -> verifier -> interpreter -> (JIT if it gets hot)
        |
        v
   Hello, World!   (printed to your console)
```

This is not new information — it's Day 003's diagram, now with your hands actually on the keyboard.

---

## 4. Internal working — what we just proved on this machine

```
PS> cd .../m1-first-program
PS> javac Hello.java
PS> java Hello
Hello, World!
```

`javac` produced a `Hello.class` file silently — no output means no compile-time errors (Day 003's compile-time checking, happening live). `java Hello` then started a JVM process, loaded that class, found `main`, and ran it. The whole Day 004 process lifecycle happened invisibly in about 100 milliseconds: a new PID was created, memory was allocated, the OS scheduled CPU time for it, and when `main` returned, the process terminated and the OS reclaimed everything.

### Dry run — tracing line by line as the literal machine

```
 JVM starts, looks for public static void main(String[] args) in class Hello
   -> found at line 2

 enters main()
   line 3: call System.out.println("Hello, World!")
       -> write the bytes for "Hello, World!" + newline to the console
   line 4: end of main() reached, nothing to return (void)

 main() returns -> JVM has nothing left to run -> process exits
```

---

---

## 4b. Compile-time vs run-time — proven on this machine

Four experiments, all run on this laptop's JDK 25.0.3. These settle questions that are easy to get wrong by reasoning alone.

### Experiment 1 — a file with **no `main` method at all**

```java
public class NoMain {
    public static void greet() { System.out.println("I have no main method."); }
}
```
```
javac NoMain.java     ->  exit 0, NoMain.class produced   ✅ COMPILES FINE
java NoMain           ->  Error: Main method not found in class NoMain,
                          please define the main method as:
                             public static void main(String[] args)
                          exit 1                           ❌ FAILS AT RUN
```

**Conclusion: `main` is a RUN-TIME requirement, not a compile-time one.** `javac` does not care whether `main` exists — it only checks the code is valid. It is the *JVM*, when you run `java NoMain`, that goes looking for an entry point and fails.

### Experiment 2 — the exact filename-mismatch error

`MyProgram.java` containing `public class Hello`:
```
javac MyProgram.java
MyProgram.java:1: error: class Hello is public, should be declared in a file named Hello.java
public class Hello {
       ^
1 error
```
Note the wording: `javac` had **no trouble finding** `MyProgram.java` — you named it on the command line. It opened it, read `public class Hello`, and *rejected* it for violating the public-class/filename rule.

### Experiment 3 — the exact missing-semicolon error

```
javac MissingSemi.java
MissingSemi.java:3: error: ';' expected
        System.out.println("no semicolon here")
                                               ^
1 error
```
The caret `^` points at the exact column where the compiler expected the `;`. Compiler errors tell you **file : line : what was expected**, plus a caret at the position. Learn to read that shape.

### Experiment 4 — silence means success

```
javac Hello.java      ->  (no output at all), exit 0
java Hello            ->  Hello, World!
```

**`javac` printing nothing means "I found nothing to complain about."** This is the standard Unix convention: *no news is good news*. Compiler silence says nothing whatsoever about what the program prints — the program's output only appears when you **run** it with `java`. Two separate steps, two separate kinds of output:

```
   javac Hello.java     ->  output here = COMPILER ERRORS (silence = success)
   java Hello           ->  output here = YOUR PROGRAM'S OUTPUT
```

---

## 4c. ⚠️ Java 25 changes the `static` story (correction)

Older material — including the first version of this note — says `main` **must** be `public static void main(String[] args)` because at startup no object exists for a non-static method to be called on.

**On Java 25, that is no longer strictly true.** Tested on this machine:

```java
class Minimal {
    void main() {                      // no public, no static, no String[] args
        System.out.println("no public, no static, no args");
    }
}
```
```
javac Minimal.java   ->  exit 0
java Minimal         ->  no public, no static, no args      ✅ IT RUNS
```

Even this works — a file with **no class declaration at all**:
```java
void main() {
    IO.println("no class declaration at all");
}
```
```
java Compact.java    ->  no class declaration at all         ✅ IT RUNS
```

This is **JEP 512 — Compact Source Files and Instance Main Methods**, finalized in Java 25. When `main` is an *instance* method, the JVM now constructs an object of the class for you and then calls `main` on it. The chicken-and-egg problem was solved by the JVM simply doing the instantiation itself.

### So which form should you actually learn and write?

**`public static void main(String[] args)` — without question.** Reasons:

1. **Every real codebase uses it.** Every Spring Boot app, every library, every legacy system you will ever join.
2. **Every interview expects it.** The instance-main feature is brand new; interviewers are asking about the classic form, and "why must it be static?" is still a standard question.
3. **The new form is deliberately a beginner/scripting on-ramp** — it exists so a first Java lesson doesn't have to explain `public`, `static`, `String[]` and classes all at once. It is not what production code looks like.

**How to answer the interview question now:** *"Classically, `main` must be `static` because the JVM has to call it before any object exists — there'd be nothing to invoke it on. As of Java 25 (JEP 512), an instance `main` is also permitted, and the JVM instantiates the class for you. But `public static void main(String[] args)` remains the standard form in all real code."*

That answer is strictly better than the textbook one, and it shows you know the current language — not a version frozen years ago.

---

## 5. Real-world usage

Every single Spring Boot application you'll write from Phase 7 onward starts execution from a `main` method that looks almost exactly like this one — just with one extra line (`SpringApplication.run(...)`) that boots the whole framework. You just wrote the literal ancestor of every backend you're going to build.

---

## 6. Interview perspective

**Standard**
1. Why must the file name match the public class name?
2. What does `public static void main(String[] args)` mean, term by term?
3. What happens if you rename `main` to something else?

**Tricky follow-ups**
- *"Can a Java file compile without a `main` method?"* → Yes — `javac` only checks the code is syntactically/semantically valid; `main` is a **runtime** requirement (`java` looks for it), not a compile-time one. Try running such a file and you'd get a runtime error (`Error: Main method not found`), not a compile error.
- *"Why is `args` a `String[]` and not, say, an `int[]`?"* → Command-line input is always raw text; if you need a number from it, you parse it yourself (`Integer.parseInt`, seen in Module 4).
- *"What's the difference between `Hello.java` and `Hello.class`?"* → One is human-authored source; the other is compiler-generated bytecode. You never hand-edit a `.class` file.

**Misconceptions**
- ❌ "Java class names and file names can differ if I'm careful." → For a `public` class, they cannot — the compiler enforces this and will refuse to compile otherwise.
- ❌ "`static` means 'constant' or 'unchangeable.'" → It means "belongs to the class, not an instance" — a completely different idea from constant-ness (`final` is the keyword for that, later).
- ❌ "`main` is what tells the **compiler** where to start." → The compiler does not care about `main` at all (Experiment 1). `main` is what tells the **JVM** where to start, at run time.
- ❌ "`javac` printing nothing means the program produced no output." → It means the *compiler* found no errors. Program output only appears when you run `java`.

---

## 7. Best practices

1. **Name files to match their public class, always** — the compiler won't let you get away with anything else, so build the habit now.
2. **One statement, one semicolon, always** — don't rely on memory here; make it reflexive.
3. **Read compiler errors top to bottom, fix the first one, recompile.** A single typo often cascades into many reported errors — fixing the first one frequently makes the rest disappear.

---

## 8. Summary card

- `public class Hello { ... }` — file must be named `Hello.java`.
- `public static void main(String[] args)` — the entry point the **JVM** (not the compiler) looks for; `static` = belongs to the class, not an object; `void` = returns nothing.
- **`main` is a run-time requirement, not a compile-time one** — a file with no `main` compiles perfectly and only fails when you run it.
- **`javac` silence = no compile errors.** Program output appears only when you run `java`. Two steps, two different kinds of output.
- Java 25 (JEP 512) also permits an *instance* `main` and even a class-less compact source file — but `public static void main(String[] args)` is what all real code and every interview uses.
- `System.out.println(...)` — writes text + newline to the console.
- Compile with `javac Hello.java` → produces `Hello.class`. Run with `java Hello` (no extension).
- Every statement ends in `;`.

---

# 🎯 INTERACTIVE CHECK

**Q1 (Conceptual).** Why does the JVM specifically require `public static void main(String[] args)` — what would go wrong if `static` were missing?

**Q2 (MCQ).** You save this class as `MyProgram.java`:
```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}
```
What happens when you run `javac MyProgram.java`?
**A)** Compiles and runs fine
**B)** Compiles, but `java Hello` fails
**C)** Fails to compile — file name doesn't match the public class name
**D)** Runs but prints nothing

**Q3 (Output).** What gets printed?
```java
public class Test {
    public static void main(String[] args) {
        System.out.println("A");
        System.out.println("B");
    }
}
```

**Q4 (Why-based).** `javac Hello.java` succeeds with zero output and zero errors. What does "zero output" actually tell you, referencing what you learned about compile-time checking in Day 003?

---

# 🐞 DEBUGGING EXERCISE

Find every bug in this file (there are **4**) before running it. Reason from the rules above — don't guess.

```java
public class Greeting
    public static void main(String[] args) {
        System.out.println("Hello there")
        system.out.println("Second line");
    }
```

---

# 📝 HOMEWORK

1. Type (don't copy-paste) `Hello.java` yourself, compile it, and run it. Confirm the output.
2. Modify it to print your own name instead of "Hello, World!" — recompile and rerun.
3. Deliberately remove the semicolon from the `println` line, run `javac`, and copy down the *exact* error message. We'll decode compiler error messages properly next session, but start getting used to reading them now.
4. Deliberately rename `main` to `Main` (capital M), try `java Hello` (after fixing the file back to compile), and note what happens.
5. Answer Q1–Q4 above.

## Next session preview

**Phase 1 · Module 2 — Variables, Data Types, and Literals.**
Where Day 002's binary/byte/bit knowledge becomes real Java keywords: `int`, `long`, `double`, `char`, `boolean` — and you'll finally write the code form of `FindLargest` from Day 006.
