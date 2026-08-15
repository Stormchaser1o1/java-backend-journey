# Day 012 — Loops: for, while, do-while, break/continue

**Phase 1 · Module 6 · 2026-08-12**

> Prerequisite: [Day 006 — Algorithms & Pseudocode](../phase-00-computer-fundamentals/day-006-algorithms-and-pseudocode.md) and [Day 011 — Control Flow](day-011-control-flow.md)

---

## 1. Motivation

Day 006 named the three building blocks of every algorithm: **sequence, selection, iteration.** Sequence arrived on Day 007, selection on Day 011. Today is the third and last — after this there is no algorithm that cannot be expressed.

Day 006 also gave a specific warning:

> *"Off-by-one errors come from subtly wrong loop boundaries (`<` vs `<=`) — always dry-run the boundary."*

Today shows how right that was.

---

## 2. The problem

Print 1 to 5 without loops: five `println` lines. Now print 1 to 1,000,000 — or 1 to *n*, where *n* is decided while the program runs.

**A loop is how you write "do this repeatedly" once.** It is the difference between a program whose size depends on its input and one whose size does not.

---

## 3. The concept

### 3a. `for` — when the count is known

```
   for (  int i = 1  ;  i <= 5  ;  i++  ) { body }
            |            |         |
            |            |         +-- UPDATE:    after each body run
            |            +------------ CONDITION: checked BEFORE each run
            +------------------------- INIT:      once, at the very start

   Execution order:
       init  ->  check -> body -> update
                   ^                |
                   +----------------+
                 check -> body -> update  ... until check is false
```

Dry-run as the literal machine:

```
   i = 1    1 <= 5? YES -> print 1 -> i becomes 2
            2 <= 5? YES -> print 2 -> i becomes 3
            3 <= 5? YES -> print 3 -> i becomes 4
            4 <= 5? YES -> print 4 -> i becomes 5
            5 <= 5? YES -> print 5 -> i becomes 6
            6 <= 5? NO  -> stop.  The body ran 5 times.
```

**The check happens before the body, so a `for` can run zero times.**

### 3b. `while` — when the count is not known

**`for` and `while` are the same machine.** `for` simply gathers the three parts onto one line where none can be forgotten:

```java
for (int i = 1; i <= 5; i++) { body }

// is exactly:

int i = 1;               // init
while (i <= 5) {         // condition
    body
    i++;                 // update
}
```

**Use `for` when counting** — the count is right there in the header. **Use `while` when waiting for a condition** — reading until end-of-file, retrying until success, looping until the user quits.

### 3c. `do-while` — check at the bottom

```java
int k = 1;
do {
    System.out.print(k + " ");
    k++;
} while (k <= 5);       // note the trailing semicolon
```

**The body runs first, then the condition is checked**, so `do-while` always runs **at least once**:

```
   n = 10
   while (n < 5)     { body }   ->  body runs 0 times
   do { body } while (n < 5);   ->  body runs 1 time
```

Use it for "ask, then validate, ask again if bad" — where the first attempt must happen regardless.

### 3d. Off-by-one — Day 006's warning made concrete

```java
for (int i = 0; i <  5; i++)   // 0 1 2 3 4     <- 5 iterations
for (int i = 0; i <= 5; i++)   // 0 1 2 3 4 5   <- 6 iterations
```

**One character. A different number of iterations.**

> **Start at 0 and use `<`** -> exactly *n* iterations.
> **Start at 1 and use `<=`** -> exactly *n* iterations.

Mixing them gives *n+1* (`i = 0; i <= n`) or *n-1* (`i = 1; i < n`). When in doubt, **dry-run the first and last iteration**.

### 3e. `break` and `continue`

```
   break    ->  ----X  exit the loop, run whatever comes after it
   continue ->  --+ +--  jump to the update step, then check the condition again
                  +-+
```

```java
for (int i = 1; i <= 8; i++) {
    if (i == 4) break;      // prints 1 2 3
    System.out.print(i);
}
for (int i = 1; i <= 8; i++) {
    if (i == 4) continue;   // prints 1 2 3 5 6 7 8
    System.out.print(i);
}
```

⚠️ **`continue` in a `while` is a classic infinite-loop trap** — if the update sits at the bottom of the body, `continue` skips over it:

```java
while (i < 10) {
    if (i == 4) continue;   // 💥 i never increments again — hangs forever
    i++;
}
```

Two fixes, and they are not equivalent in quality:

```java
// LOCAL fix — advance before skipping
while (i < 10) {
    if (i == 4) { i++; continue; }
    i++;
}

// STRUCTURAL fix — the update lives in the header, so `continue` always runs it
for (int i = 0; i < 10; i++) {
    if (i == 4) continue;
    ...
}
```

**Prefer the structural fix.** It makes the bug impossible rather than merely absent — the same reasoning as choosing an arrow `switch` over remembering `break` (Day 011).

### 3f. Loop variable scope

```java
for (int i = 0; i < 3; i++) { ... }
System.out.println(i);   // ❌ won't compile: cannot find symbol

int outside = 0;
while (outside < 3) { outside++; }
System.out.println(outside);   // ✅ 3 — declared outside, so it survives
```

**A `for` variable is born and dies with the loop.** It cannot leak, and the name `i` is free to reuse in the next loop.

### 3g. Nested loops

```java
for (int row = 1; row <= 3; row++) {
    for (int col = 1; col <= 5; col++) { ... }
}
```

**The inner loop runs completely for each single step of the outer one** — 3 x 5 = **15** inner iterations. That multiplication is the first taste of complexity analysis; Phase 4 calls it O(n^2).

⚠️ **`break` only leaves the innermost loop.** To escape both, label the outer one:

```java
outer:
for (...) {
    for (...) {
        if (done) break outer;   // leaves BOTH
    }
}
```

---

## 4. Internal working — verified on this machine (JDK 25.0.3)

From [`Looping.java`](../../code/phase-01-java-fundamentals/m6-loops/Looping.java):

```
for       : 1 2 3 4 5
while     : 1 2 3 4 5
do-while  : 1 2 3 4 5        <- identical

while (false)    runs: (nothing)
do-while (false) runs: body  <- ONCE, because the check is at the BOTTOM

i < 5  gives : 0 1 2 3 4     (5 numbers)
i <= 5 gives : 0 1 2 3 4 5   (6 numbers)

break at 4    : 1 2 3
continue on 4 : 1 2 3 5 6 7 8

  1  2  3  4  5
  2  4  6  8 10
  3  6  9 12 15
```

### 4b. The five ways loops break

From [`LoopTraps.java`](../../code/phase-01-java-fundamentals/m6-loops/LoopTraps.java):

**① Forgetting the update — infinite loop.**
```
1 1 1 1 1 1 1 1 ... (stopped by a guard)
```
`i` never changes, so `i <= 5` is true forever. Without the guard, this never ends.

**② The stray semicolon.**
```java
for (int n = 0; n < 5; n++);    // <- this semicolon IS the body
{
    count++;                     // a plain block, running ONCE
}
```
```
count after `for (...);` + block = 1   <- 1, not 5
```
**The loop runs 5 times doing nothing**, then the block below runs once as an ordinary block of code.

**Why is there no warning?** Both halves are perfectly legal Java. An empty statement is a valid loop body — sometimes deliberately, as in `while (readNext());` — and a bare `{ }` is a valid statement. The compiler has nothing to object to. **Only a linter or IDE flags this**, which is exactly why it survives into real code.

**③ Comparing doubles in a loop condition.**
```
never reached exactly 1.0 - stopped after 16 steps
0.1 added ten times = 0.9999999999999999  <- not exactly 1.0
```
Day 008's floating-point lesson, now causing an infinite loop. `d != 1.0` never becomes false because `d` steps straight past 1.0. **Loop counters should be `int`.**

**④ Modifying the counter inside the body.**
```
i incremented in BOTH places: 0 2 4 6 8
```
The header's `n++` is not the only thing that can move `n`.

**⑤ `break` only leaves the innermost loop.**
```
plain break:              labelled break:
   row 1, col 1              row 1, col 1
   row 2, col 1
   row 3, col 1
```

---

## 5. Real-world usage

```java
while ((line = reader.readLine()) != null) { ... }   // read a file until it ends
for (Order o : orders) { total += o.amount(); }      // the for-each — Module 7
while (attempts < 3 && !success) { ... }             // retry, with a cap
```

That last one is the shape of every retry in production code — and note the cap. **A loop that depends on an external system needs a bound**, or one bad response hangs a server thread forever.

---

## 6. Interview perspective

**Standard**
1. Difference between `while` and `do-while`?
2. `break` vs `continue`?
3. How many times does `for (int i = 0; i < 5; i++)` run?

**Tricky follow-ups**
- *"When would you use `do-while`?"* → When the body must run at least once before the condition can be evaluated — menu prompts, input validation.
- *"What does `for (int i = 0; i < 5; i++);` do?"* → Loops 5 times with an **empty body**. Compiles silently; no warning, because both the empty statement and the following block are legal.
- *"How do you break out of nested loops?"* → A **labelled break**.
- *"Why is `for (double d = 0; d != 1.0; d += 0.1)` dangerous?"* → Floating-point drift means `d` never equals 1.0 exactly, so it never terminates.
- *"Why can `continue` hang a `while` but not a `for`?"* → In a `while` the update is inside the body and gets skipped; in a `for` it is in the header and always runs.

**Misconceptions**
- ❌ "`break` exits all loops." → Only the innermost, unless labelled.
- ❌ "`for` and `while` are fundamentally different." → Identical machinery, different layout.
- ❌ "A `for` loop always runs at least once." → It can run zero times; `do-while` is the one that cannot.
- ❌ "The loop variable is available afterwards." → Not if declared in the `for` header.
- ❌ "A stray `;` stops the loop after one iteration." → The loop still runs in full; it just does nothing each time.

---

## 7. Best practices

1. **`for` when you know the count; `while` when you are waiting on a condition.**
2. **Prefer `i = 0; i < n`** — the convention, matching array indexing (Module 7), giving exactly *n* iterations.
3. **Dry-run the first and last iteration.** Every off-by-one dies here.
4. **Never use a `double` as a loop counter**, and never `!=` on one.
5. **Do not modify the counter inside the body** — keep all movement in the header.
6. **Always brace the body**, and watch for the stray `;` after `)`.
7. **Bound any loop that waits on the outside world.**

---

## 8. Summary card

- **`for`** = `init; condition; update`. Order: init → **check** → body → update → check…
- **`for` and `while` are the same machine.** `for` for counting, `while` for waiting.
- **`do-while` checks at the bottom, so it always runs at least once.** Note the trailing `;`.
- **`i < n` from 0, or `i <= n` from 1 → exactly *n* iterations.** Mixing them is the off-by-one.
- **`break`** leaves the loop; **`continue`** skips to the next iteration.
- ⚠️ **`continue` in a `while` can hang** if the update is in the body. Prefer the structural fix: use a `for`.
- **`for (...);`** — a stray semicolon is a legal, empty-bodied loop that still runs in full. No warning, because it is valid Java.
- **Never loop on a `double`**, and never with `!=`.
- **A `for` variable dies with the loop**; one declared outside survives.
- **Nested loops multiply:** 3 x 5 = 15 inner runs. **`break` leaves only the innermost** — use a **label** to escape both.

---

# 🎯 INTERACTIVE CHECK — answers reviewed

**Q1.** Rewrite the `for` as a `while` ✅
```java
int i = 1;              // INIT
while (i < 6) {         // CONDITION  (same boundary as i <= 5)
    System.out.println(i);
    i++;                // UPDATE
}
```

**Q2.** `for (int i = 10; i > 0; i -= 3)` → **B) 4** ✅ — verified: `10 7 4 1`, then `-2` fails the check.

**Q3.** `while (n < 5)` with `n = 10` prints nothing; `do-while` prints `D` once ✅ — the check is at the bottom.

**Q4.** Why does the `continue` loop hang, and two fixes? 🔸
Diagnosis correct: `continue` jumps past `i++`, so `i` sticks at 4. One fix given (rewrite as a `for` — the **structural** fix, and the better one). The second keeps the `while`:
```java
if (i == 4) { i++; continue; }   // advance before skipping
```

**Q5.** `for (...);` followed by a block 🔸
The counts were inverted. **The loop runs 5 times with an empty body**; the block runs **once**. The `;` does not stop anything — it *is* the body.
**No warning appears** because both pieces are legal Java: an empty statement is a valid loop body, and a bare block is a valid statement.

---

# 🐞 DEBUGGING EXERCISE — 4/4

Four bugs — one compile error, three that compiled, one of which hung the program. Solved version: [`Stats.java`](../../code/phase-01-java-fundamentals/m6-loops/Stats.java), verified `javac` exit 0 and printing:

```
sum = 55
tick 3
tick 2
tick 1
evens = 5
found = 21
```

| Bug | Category | Fix |
|---|---|---|
| `for (int i = 1; i < 10; ...)` | silently wrong — summed 1..9 = 45 | `i <= 10` |
| `while (n > 0)` with no `n--` | **infinite loop** | add `n--` |
| `for (int i = 1; i <= 10; i++);` | compile error — `cannot find symbol: i` | remove the `;` so the block becomes the body |
| `continue` instead of `break` | silently wrong — kept the **last** multiple (98) | `break` → stops at the first, 21 |

**Ordering luck worth noticing:** the stray semicolon was a *compile* error, so the program could not run at all until it was fixed — which meant the infinite loop could not bite until the file compiled.

Submitted compiled and verified, second module running.

---

# 📝 HOMEWORK

1. Run both demos:
   ```
   cd code/phase-01-java-fundamentals/m6-loops
   java Looping.java
   java LoopTraps.java
   ```
2. Write `Times.java` printing the 7-times table, 7x1 to 7x10, one line each.
3. Write `Sum.java` computing 1+2+…+100 with a loop, then check it against Gauss's formula `n*(n+1)/2`.
4. Write `Stars.java` printing a five-row left-aligned triangle using nested loops.
5. Write `Reverse.java` counting down 10 to 1 on one line — once with `for`, once with `while`. Confirm identical output.
6. **Deliberately** write an infinite loop, run it, and stop it with `Ctrl+C`.

## Next session preview

**Phase 1 · Module 7 — Arrays (1D and 2D).** Where `i < n` stops being a convention and starts being the *reason* — array indices run 0 to length-1, so an off-by-one is no longer a wrong number but an `ArrayIndexOutOfBoundsException`.
