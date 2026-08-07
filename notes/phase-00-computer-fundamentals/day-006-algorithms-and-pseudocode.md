# Day 006 — Algorithms & Pseudocode: Thinking Before Coding

**Phase 0 · Module 6 (final) · 2026-08-07**

> Prerequisite: [Day 005 — How the Internet Works](day-005-how-the-internet-works.md)

---

## 1. Motivation

Every module so far explained *machinery* — CPU, binary, compilers, the OS, the network. Today is different: it's about **you**, and how you think before any of that machinery gets involved.

Recall Day 001's ATM exercise: you knew the balance check was necessary, said it out loud, but didn't *write it as a step* — and the algorithm broke. That gap between "I understand this" and "I wrote every step down explicitly" is the single biggest reason beginners struggle once real syntax enters the picture in Phase 1. Today builds the discipline to close that gap, deliberately, *before* syntax is even a factor.

---

## 2. The problem

Once you start writing real Java next session, you'll be tempted to open the editor and start typing immediately. For trivial problems, that works. For anything non-trivial, it produces exactly what you saw yourself do on Day 001 — plausible-looking steps with silent, structural holes.

**The fix is to separate two skills that beginners conflate:** *solving the problem* and *writing it in a language's syntax*. Pseudocode isolates the first skill so you can practice it without syntax errors ever getting in the way.

---

## 3. The concept

### Algorithm — a definition worth pinning down precisely

An algorithm is a finite, ordered sequence of unambiguous steps that takes some input and produces some output, and is guaranteed to terminate (stop). Four properties, each one earns its place:

| Property | Meaning | What breaks if it's missing |
|---|---|---|
| **Finite** | A specific, countable number of steps | An infinite loop isn't an algorithm |
| **Ordered** | Steps happen in a defined sequence | Swap two steps (Day 001's PIN bug) and meaning changes |
| **Unambiguous** | Each step has exactly one interpretation | "Check if correct" with no branch is ambiguous about *then what* |
| **Terminates** | It eventually stops | A "wait until X" with no way to reach X never ends |

### Pseudocode — writing the algorithm without committing to a language yet

Pseudocode is structured English: it looks like code, uses code-like keywords (`IF`, `WHILE`, `FOR`), but has no compiler, no strict syntax rules, and isn't tied to Java, Python, or anything else. Its entire purpose is to let you focus 100% on **logic**, with zero risk of a missing semicolon distracting you.

```
   THE PROBLEM (in your head)
        |
        v
   PSEUDOCODE  <-- today's focus: pure logic, any "language"-like notation
        |
        v
   REAL CODE (Java)  <-- Phase 1: translate proven logic into exact syntax
```

You solve the *thinking* problem once, in pseudocode. Translating proven pseudocode into Java syntax next week is comparatively mechanical — you won't be doing both hard things (thinking + syntax) at the same time.

### The three building blocks — everything is made of just these

You already discovered two of these yourself, on Day 001, by asking "what would actually happen?" Today they get names.

**1. Sequence** — steps run top to bottom, one after another. The default.
```
Step 1
Step 2
Step 3
```

**2. Selection (branching)** — a decision point. Different paths depending on a condition. This is what was *missing* from your Day 001 PIN check.
```
IF condition THEN
    do this
ELSE
    do that
END IF
```

**3. Iteration (looping)** — repeat a block of steps, either a fixed number of times or until a condition is met. Prevents you from writing "Step 4, Step 5, Step 6, Step 7..." by hand for something repetitive.
```
WHILE condition is true
    repeat this step
END WHILE
```

**Every program you will ever write — from a calculator to a Spring Boot backend serving a million users — is built from nothing but these three blocks, nested and combined.** That is not an exaggeration; it's a real, foundational result in computer science (structured program theorem). Nothing you learn from here forward introduces a fourth fundamental shape — everything else is convenience built on top of these three.

---

## 4. Internal working — how to actually build an algorithm, step by step

This is a repeatable method, not a one-off example. Use it every time.

**Method:**
1. State the problem in one plain sentence.
2. List the inputs (what you're given) and the output (what you must produce).
3. Work a concrete example by hand first — before writing any steps. If you can't solve one specific instance by hand, you cannot write an algorithm for the general case.
4. Convert your by-hand process into numbered pseudocode steps.
5. Dry-run your own pseudocode with a *different* concrete example, playing the literal, judgement-free machine. Look for: ambiguous checks with no branch, missing edge cases, steps you thought but didn't write.

### Worked example: find the largest of three numbers

**Step 1 — plain sentence:** given three numbers, determine which one is largest.

**Step 2 — inputs/output:** input: three numbers `a`, `b`, `c`. Output: the largest of the three.

**Step 3 — solve by hand:** take `a=7, b=2, c=9`. I compare 7 and 2 → 7 is bigger, keep 7 in mind. Compare that 7 against 9 → 9 is bigger. Answer: 9.

Notice what just happened: I never compared all three at once — I compared *two at a time*, keeping a "current winner." That's the actual algorithmic insight, discovered by working the example, not by guessing at pseudocode first.

**Step 4 — pseudocode:**
```
ALGORITHM FindLargest(a, b, c)
    largest <- a              // assume a is largest, for now

    IF b > largest THEN
        largest <- b
    END IF

    IF c > largest THEN
        largest <- c
    END IF

    RETURN largest
END ALGORITHM
```

(`<-` means "gets the value of" / assignment — you'll write this as `=` in Java next week, but here it's deliberately not the equals sign, to avoid confusing it with mathematical equality.)

**Step 5 — dry run with a fresh example**, `a=3, b=8, c=5`, tracing it exactly as the literal machine would:

```
  largest <- a           →  largest = 3
  IF b > largest?        →  IF 8 > 3?  →  YES
      largest <- b       →  largest = 8
  IF c > largest?        →  IF 5 > 8?  →  NO (skip)
  RETURN largest         →  returns 8
```

Correct. Now stress-test it with an edge case — **this is the step beginners skip, and it's where real bugs hide**: what if two numbers are equal, `a=5, b=5, c=3`?

```
  largest <- a           →  largest = 5
  IF b > largest?        →  IF 5 > 5?  →  NO (5 is not strictly greater than 5)
  IF c > largest?        →  IF 3 > 5?  →  NO
  RETURN largest         →  returns 5
```

Still correct — `largest` correctly stays 5. Good algorithms survive this kind of deliberate stress-testing; that's exactly how you gain confidence in one before ever typing a line of Java.

### A second worked example: sum of the first N natural numbers — introducing iteration

**Step 1:** given a number `n`, add up every whole number from 1 to `n`.

**Step 2:** input: `n`. Output: the total sum.

**Step 3 — by hand**, `n=5`: 1+2+3+4+5 = 15. I kept a running total and added the next number each time.

**Step 4 — pseudocode:**
```
ALGORITHM SumToN(n)
    total <- 0
    i <- 1

    WHILE i <= n
        total <- total + i
        i <- i + 1
    END WHILE

    RETURN total
END ALGORITHM
```

**Step 5 — dry run**, `n=3`, tracked as a table — this table format is exactly how you'll trace real Java loops in Phase 1:

```
 step | i | i<=n?  | total (before) | total (after) | i (after)
------+---+--------+-----------------+----------------+-----------
 start|   |        |                |       0        |     1
  1   | 1 |  YES   |       0        |    0+1 = 1     |     2
  2   | 2 |  YES   |       1        |    1+2 = 3     |     3
  3   | 3 |  YES   |       3        |    3+3 = 6     |     4
  4   | 4 |  NO    |       -        |       -        |     -
------+---+--------+-----------------+----------------+-----------
 RETURN total = 6
```

Verify by hand: 1+2+3 = 6. ✅ Notice the loop stops the instant `i <= n` is false — it checks *before* each repetition, not after. Get this order wrong (check after instead of before) and you get an **off-by-one error** — one of the single most common bugs in all of programming, and now you've seen exactly where it comes from: a boundary condition (`i <= n` vs `i < n`) that looks almost identical but behaves differently.

---

## 5. Flowcharts — the visual form of the same idea

Some people think better visually. A flowchart is pseudocode drawn as a diagram:

```
        +-------+
        | START |
        +-------+
            |
            v
     +-------------+
     | largest <- a |
     +-------------+
            |
            v
        +-------+        YES      +----------------+
        | b>largest? |----------->| largest <- b   |
        +-------+                 +----------------+
            | NO                          |
            v<----------------------------+
        +-------+        YES      +----------------+
        | c>largest? |----------->| largest <- c   |
        +-------+                 +----------------+
            | NO                          |
            v<----------------------------+
     +----------------+
     | RETURN largest |
     +----------------+
            |
            v
         +-----+
         | END |
         +-----+
```

Diamond = decision (selection). Rectangle = an action/step. Arrows = the order (sequence). You'll see this exact shape vocabulary again when we cover flowcharts for real Java control flow in Phase 1.

---

## 6. Real-world usage

- **Every technical interview that isn't a pure syntax quiz starts here.** Interviewers explicitly want to see you work an example by hand and reason about edge cases *before* writing code — exactly the method above. Jumping straight to code is read as a red flag, not a strength.
- **Production incident postmortems** are frequently, in the end, a missing `ELSE` branch or an off-by-one loop boundary — the exact two failure modes you practiced spotting today, just wearing real-code clothing.
- **Pseudocode is how engineers communicate designs to each other** before writing a line of code — in design docs, whiteboard sessions, and code review comments, specifically because it's language-agnostic and fast to read.

---

## 7. Interview perspective

**Standard questions**
1. What are the three fundamental building blocks of any algorithm?
2. What's the difference between an algorithm and pseudocode?
3. Why do we dry-run an algorithm before coding it?

**Tricky follow-ups**
- *"Give me an algorithm that never terminates — is it still an algorithm?"* → No, by definition — termination is one of the four required properties. It's just a **process** or a **loop with no exit**, not an algorithm.
- *"What's an off-by-one error, and why does it happen?"* → A boundary condition (`<` vs `<=`, starting at 0 vs 1) that's subtly wrong, causing a loop to run once too many or too few times. It happens because the *fix* to Day 001's problem — writing every check down explicitly — doesn't automatically guarantee the check's *boundary* is correct; that still needs a deliberate edge-case dry run.
- *"Why bother with pseudocode if you already know the target language?"* → Because it forces you to fully solve the logic problem before also fighting syntax — conflating the two is exactly why beginners produce code that compiles but is wrong.

**Misconceptions**
- ❌ "Pseudocode has strict rules like real code." → It doesn't — its only job is to be unambiguous to a human reader; there's no compiler to satisfy.
- ❌ "If my dry run works for one example, the algorithm is correct." → One passing example proves nothing; you must specifically test edge cases (equal values, zero, empty input, the largest/smallest possible values).
- ❌ "Selection and iteration are 'advanced' topics for later." → You've now used both, from first principles, without writing a single line of real syntax. Phase 1 is teaching you *Java's spelling* for ideas you already understand.

---

## 8. Best practices

1. **Always solve one concrete example by hand before writing pseudocode.** If you can't do it by hand, you don't understand the problem yet — no amount of code will fix that.
2. **Dry-run your own pseudocode against an edge case, not just a "normal" case**, before trusting it. Equal values, zero, empty input, the very first/last item — these are where real bugs live.
3. **Write down every check as an explicit `IF`/`ELSE` branch.** "Check X" is not a step; "Check X, and if true do A, if false do B" is a step. This was the exact lesson from Day 001, now formalized with real vocabulary.
4. **When stuck, don't jump to code — go back to pseudocode.** This applies for the rest of your career, not just as a beginner; senior engineers whiteboard pseudocode for genuinely hard problems too.

---

## 9. Summary card

- An algorithm must be **finite, ordered, unambiguous, and terminating.**
- **Pseudocode** = structured English for pure logic, with no syntax to worry about — isolates "solving the problem" from "writing the language."
- Every algorithm is built from exactly **three blocks**: **sequence** (top to bottom), **selection** (`IF`/`ELSE`, branching), and **iteration** (`WHILE`/`FOR`, repeating).
- **Method:** state the problem → identify inputs/output → solve one example by hand → write pseudocode → dry-run against a *fresh*, ideally edge-case, example.
- **Off-by-one errors** come from subtly wrong loop boundaries (`<` vs `<=`) — a direct descendant of the "write every step down" lesson from Day 001.
- Flowcharts are the same three blocks, drawn: rectangle = step, diamond = decision, arrows = sequence.

---

# 🎉 Phase 0 — Computer Fundamentals: COMPLETE

You now understand, from first principles: why computers exist and think the way they do, how data is physically represented, how source code becomes execution, what an OS actually does for every program you'll write, how two computers talk to each other over a network, and how to think algorithmically before touching syntax.

**Every single thing in Phase 1 onward is going to hang off of these six modules.** When Phase 3 explains JVM heap/stack in depth, it's building on Day 004. When Phase 7 has you write `@GetMapping`, it's building on Day 005. When you write your first `for` loop next session, it's translating Day 006's `WHILE` directly into Java syntax you already understand the *meaning* of.

## Next session preview

**Phase 1 · Module 1 — Setting Up and Writing Your First Real Java Program.**

Full Q&A rigor resumes here: Interactive Check, Debugging Exercises, and Homework are all back, starting now that there's real code to reason about. We'll set up your project structure properly, write and run actual `.java` files, and translate today's `FindLargest` and `SumToN` pseudocode into working Java — so your very first real programs are ones you've *already* proven correct by hand.
