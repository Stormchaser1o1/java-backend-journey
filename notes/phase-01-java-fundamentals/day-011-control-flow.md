# Day 011 — Control Flow: if/else and switch

**Phase 1 · Module 5 · 2026-08-12**

> Prerequisite: [Day 006 — Algorithms & Pseudocode](../phase-00-computer-fundamentals/day-006-algorithms-and-pseudocode.md) and [Day 009 — Operators](day-009-operators.md)

---

## 1. Motivation

On Day 006 the pseudocode said `IF b > largest THEN ... END IF`, with a note that `<-` would become `=` later. `if` has appeared in passing three times since, always deferred to "Module 5". This is Module 5.

Everything written so far runs top to bottom, every line, every time. Today programs get to **make decisions** — the difference between a calculator that always adds and one that responds to what was asked.

---

## 2. The problem

`int score = 72`, and a grade is needed. The English is easy: *90+ is an A, 75+ is a B, 60+ is a C, otherwise a fail.* Two things must hold:

1. Only **one** branch may run.
2. The tests must be in the right **order** — because 95 is also >= 75 and also >= 60.

Both are Day 006's *"a check with no branch is silently ignored"* in new clothes.

---

## 3. The concept

### 3a. if / else if / else

```
   score = 72
        |
        v
   score >= 90 ?  --no-->  score >= 75 ?  --no-->  score >= 60 ?  --YES--> "Grade C"
        |                                                                     |
       yes                                                                    v
        v                                                            STOP - skip the rest
    "Grade A"
```

**The first true condition wins and the chain stops there.** Nothing below is even tested.

**Order matters, and getting it backwards fails silently:**

```java
if (score >= 60)      { "Grade C" }   // 95 lands here!
else if (score >= 75) { "Grade B" }   // unreachable for anything >= 60
```

**Rule: order overlapping tests narrowest to widest.**

### 3b. The condition must be a boolean — Java has no "truthy"

```java
int count = 5;
if (count) { }        // ❌ won't compile: int cannot be converted to boolean
if (count != 0) { }   // ✅ say what you mean
```

**But there is one hole:**

```java
boolean flag = false;
if (flag = true) {    // ⚠️ ASSIGNMENT, not comparison — this COMPILES
    ...               // always runs, and flag is now true
}
```

Both `x = 5` and `flag = true` **assign**; neither compares. The only difference is the type of the leftover value:

```
   x = 5        ->  leftover value is  5     ->  int      ->  if rejects it  ✅ caught
   flag = true  ->  leftover value is  true  ->  boolean  ->  if accepts it  ❌ slips through
```

The type system is what catches the first. When the variable is already `boolean`, the safety net has nothing to catch — the wrong code has exactly the right type. **Write `if (flag)`**: no operator, nothing to get wrong. (`if (flag == true)` works but is redundant, and keeps an `=` sitting next to a boolean.)

### 3c. Braces — an unbraced `if` owns exactly ONE statement

```java
if (x > 5)
    System.out.println("big");     // the if owns ONLY this
    System.out.println("done");    // NOT part of the if — runs unconditionally
```

**The compiler does not read indentation.**

> Apple shipped a bug in 2014 (**"goto fail"**) with exactly this shape — a duplicated line outside an unbraced `if` meant SSL certificate validation was skipped entirely, on every iPhone and Mac. One missing pair of braces, a global security hole.

**Always use braces. Even for one line. Especially for one line.**

### 3d. The dangling else

```java
if (loggedIn)
    if (isAdmin)
        System.out.println("admin panel");
    else
        System.out.println("NOT an admin");   // binds to the INNER if
```

**The `else` binds to the nearest unmatched `if`.** Indentation suggests otherwise — that is the trap. Braces remove the ambiguity.

### 3e. switch — the classic form and fall-through

```java
switch (day) {          // day = 2
    case 1: print("Mon ");
    case 2: print("Tue ");    // <- matches here
    case 3: print("Wed ");    // <- and keeps going
    case 4: print("Thu ");
    default: print("(end)");
}
// prints:  Tue Wed Thu (end)
```

**`case` labels are entry points, not boundaries.** Matching tells Java *where to start*; only `break` says where to stop.

The one legitimate use of fall-through is stacking labels to share a body:

```java
case 1: case 3: case 5: case 7: case 8: case 10: case 12:
    days = 31; break;
```

Every other fall-through is a bug.

### 3f. The modern arrow switch (Java 14+) — prefer this

```java
switch (day) {
    case 1 -> System.out.print("Mon");
    case 2 -> System.out.print("Tue");
    default -> System.out.print("other");
}
```

**No `break`. Fall-through impossible.** And it can be an **expression** producing a value:

```java
String kind = switch (day) {
    case 1, 7 -> "Weekend";           // multiple labels, comma-separated
    case 2, 3, 4, 5, 6 -> "Weekday";
    default -> "Invalid";
};                                    // note the `=` before and the `;` after
```

For a multi-line arm, use a block and `yield`:

```java
case 2 -> {
    String s = "Apr-Jun";
    yield s + " (yield returns from a block)";
}
```

**An expression switch must be exhaustive.** Deleting `default` is a compile error — see §4b. A *statement* switch has no such rule, which is why a forgotten case there silently does nothing. **The expression form converts a class of silent bug into a compile error.**

### 3g. What switch accepts

`byte`, `short`, `char`, `int`, `String`, enums and their wrappers. **Not `long`, `float`, `double`, `boolean`.**

`switch` on a `String` compares with `.equals()` internally, so it is safe — unlike writing `==` yourself (Module 8).

---

## 4. Internal working — verified on this machine (JDK 25.0.3)

From [`Branching.java`](../../code/phase-01-java-fundamentals/m5-control-flow/Branching.java):

```
score 72 -> Grade C   (the FIRST true branch wins, then it stops)
bad chain -> Grade C  (a 95 would ALSO print Grade C here)

if (flag = true) -> always runs, and flag is now true

=== 4. Missing braces ===
   this line ALWAYS runs - it is not part of the if!

=== 5. The dangling else ===
   NOT an admin
```

Section 4 is the proof worth reading twice: `x` is 3, so `x > 5` was false and the guarded line correctly did **not** print — yet the line after it did. That is the demonstration that the second line was never inside the `if`.

From [`Switching.java`](../../code/phase-01-java-fundamentals/m5-control-flow/Switching.java):

```
=== 1. WITHOUT break ===
day 2 prints: Tue Wed Thu (end)      <- fell through three cases and the default
=== 2. WITH break ===
day 2 prints: Tue
=== 4. Arrow switch ===
day 2 prints: Tue
=== 5. switch as an EXPRESSION ===
day 2 is a Weekday
quarter 2 = Apr-Jun (yield returns from a block)
```

### 4b. Exhaustiveness, confirmed by deliberately removing `default`

```
NoDefault.java:4: error: the switch expression does not cover all possible input values
        String s = switch (day) {
                   ^
1 error
```

---

## 5. Real-world usage

```java
if (user == null)        { return unauthorized(); }   // guard clause
if (!user.isActive())    { return forbidden(); }
return ok(user.getProfile());                          // happy path, unindented
```

**Guard clauses** are how backend code stays readable: handle each failure and `return` immediately rather than nesting the success path five levels deep. This shape appears in every controller from Phase 7.

```java
HttpStatus status = switch (result.type()) {
    case SUCCESS   -> HttpStatus.OK;
    case NOT_FOUND -> HttpStatus.NOT_FOUND;
    case INVALID   -> HttpStatus.BAD_REQUEST;
};   // no default needed — an enum switch covering every constant is exhaustive
```

That is the real payoff: add a new enum constant later and **the compiler points at every switch that needs updating.**

---

## 6. Interview perspective

**Standard**
1. Difference between an `if/else if` chain and a `switch`?
2. What happens if you forget `break`?
3. Can you `switch` on a `double`? *(No — nor `long`, `float`, `boolean`.)*

**Tricky follow-ups**
- *"Why does `if (flag = true)` compile when `if (x = 5)` doesn't?"* → Both assign; only the boolean one leaves a value of the type `if` requires.
- *"What is the dangling else?"* → An unbraced `else` binds to the **nearest unmatched `if`**, regardless of indentation.
- *"When is fall-through useful?"* → Stacked case labels with no code between them.
- *"Why prefer a switch expression?"* → It must be exhaustive, so a missing case is a compile error, and there is no `break` to forget.
- *"Is `switch` on a String safe from the `==` problem?"* → Yes — it uses `.equals()` internally.

**Misconceptions**
- ❌ "Indentation determines what belongs to an `if`." → Braces do.
- ❌ "`if (count)` works when count is non-zero." → Java has no truthiness; it will not compile.
- ❌ "`flag = true` checks the flag." → It **assigns**. It never checks.
- ❌ "Forgetting `break` is a compile error." → It is silent fall-through.

---

## 7. Best practices

1. **Always use braces**, even for one-line bodies.
2. **Order overlapping conditions narrowest first.**
3. **Prefer the arrow `switch`** over the colon form.
4. **Prefer a switch *expression*** when producing a value — exhaustiveness is free bug-catching.
5. **Use guard clauses** rather than nesting the happy path.
6. **Write `if (flag)`**, not `if (flag == true)`.
7. **Always have a final `else`/`default`** when a variable must end up assigned.

---

## 8. Summary card

- `if / else if / else`: **the first true condition wins and the chain stops.** Order narrowest -> widest.
- **Conditions must be `boolean`** — no truthiness.
- ⚠️ `if (flag = true)` compiles and is always true. **`=` assigns; it never checks.** Write `if (flag)`.
- **An unbraced `if` owns exactly one statement.** Indentation is a lie the compiler does not read. ("goto fail")
- **Dangling else binds to the nearest unmatched `if`.**
- **Classic `switch` falls through without `break`** — `case` labels are entry points, not boundaries.
- Deliberate fall-through has one good use: **stacked labels sharing a body.**
- **Arrow `switch` (`->`) has no fall-through and needs no `break`.**
- **A switch *expression* must be exhaustive** — a missing case is a compile error. Use `yield` in a block arm.
- `switch` accepts `byte`/`short`/`char`/`int`/`String`/enum. **Not `long`, `float`, `double`, `boolean`.**

---

# 🎯 INTERACTIVE CHECK — answers reviewed

**Q1.** Why is the reversed grade chain wrong for 95? ✅
`>= 60` matches first and prints C. Rule: **order overlapping tests narrowest first.**

**Q2.** `switch` on `day = 2` with no `break` → **C) `BCD`** ✅
Well put in the session: *"it just knows the starting condition"* — case labels say where to start, `break` says where to stop.

**Q3.** `x = 3`, unbraced `if` followed by a second `println` → prints **`done`** ❌ (answered "nothing").
`"big"` is correctly skipped; `"done"` never belonged to the `if` and runs unconditionally.

**Q4.** Why does `if (flag = true)` compile? ❌ (answered that it "checks" the flag)
**It assigns.** Both forms assign; only the boolean one leaves a value of the type `if` demands.

**Q5.** Rewrite the chain as a switch expression ❌ (produced a switch *statement* printing text, leaving `size` unassigned).

```java
String size = switch (code) {
    case 1 -> "small";
    case 2 -> "medium";
    case 3 -> "large";
    default -> "unknown";
};
```
**Guarantee gained: exhaustiveness** — removing `default` becomes a compile error, where the statement form would silently assign nothing.

---

# 🐞 DEBUGGING EXERCISE — 4/4

Four bugs — one compile error, three silently wrong. Solved version: [`Ticket.java`](../../code/phase-01-java-fundamentals/m5-control-flow/Ticket.java), verified `javac` exit 0 and printing:

```
normal
type = adult
```

| Line | Category | Fix |
|---|---|---|
| chain ordered `>= 5` first | silently wrong | reorder narrowest first: 60, 18, 5 |
| no final `else` | compile error — `variable type might not have been initialized` | add `else { type = "infant"; }` |
| `if (isMember = true)` | silently wrong — always true, and flips `isMember` | `if (isMember)` |
| `switch` with no `break` | silently wrong — printed "normal" **and** "low" | arrow switch expression |

**Route taken:** the first attempt reordered the chain correctly but left the other three, and did not compile — `System.out.println("urgent") break;` is missing a semicolon, because `break` is a separate statement. Those three parse errors **hid** the definite-assignment error underneath, exactly as in Day 008 §4d. The second attempt fixed all four and reached for the **arrow switch expression** unprompted rather than merely adding `break` — choosing the form where the bug is impossible over the form where it is merely avoided.

---

# 📝 HOMEWORK

1. Run both demos:
   ```
   cd code/phase-01-java-fundamentals/m5-control-flow
   java Branching.java
   java Switching.java
   ```
2. Write `Grade.java` — an `int score` printing A/B/C/D/Fail with a correctly ordered chain. Test 95, 80, 65, 50 and **0**.
3. Write `Season.java` using a **switch expression** mapping month 1-12 to Winter/Spring/Summer/Autumn with comma-separated labels. Then delete the `default` and record the exact compiler error.
4. Predict what `Switching.java` §1 prints for `day = 4` **before** running it.
5. Write `Leap.java` deciding whether a year is a leap year: divisible by 4, except centuries not divisible by 400. Dry-run 2024, 1900, 2000 and 2023 first.

## Next session preview

**Phase 1 · Module 6 — Loops: `for`, `while`, `do-while`, `break`/`continue`.** The off-by-one errors warned about on Day 006 finally get to bite for real, along with infinite loops, loop scope, and why `for` and `while` are the same machine wearing different clothes.
