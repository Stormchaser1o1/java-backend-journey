# Day 010 — Type Conversion, Casting, and Overflow

**Phase 1 · Module 4 · 2026-08-12**

> Prerequisite: [Day 008 — Variables & Data Types](day-008-variables-and-data-types.md) and [Day 009 — Operators](day-009-operators.md)

---

## 1. Motivation

Three times already a wrong answer came from the same root cause, each time dismissed as a side note:

- Day 008: `byte retries = 200;` would not compile.
- Day 009: `2500 / 7` gave `357.0` instead of `357.14…`
- Day 009: `byte small = 10; small += 300;` gave `54`.

All three are **type conversion**. Today it becomes the subject — because in a backend this is where silent data corruption comes from.

---

## 2. The problem

```java
int totalViews = 2100000000;
int newViews   =  300000000;
long allViews  = totalViews + newViews;   // declared long — surely that is safe?
```

`long` holds up to 9 quintillion and the true answer is 2.4 billion, which fits easily.

It prints **`-1894967296`**.

---

## 3. The concept

### 3a. The widening ladder

```
             byte -> short -> int -> long -> float -> double
                              ^
                     char ----+
                  (char joins at int)

    --------------> WIDENING: automatic, no cast, "always safe"
    <-------------- NARROWING: explicit cast required, data may be lost
```

```java
int  i = 42;
long l = i;          // ✅ widening — no cast, nothing lost
int  back = l;       // ❌ won't compile — narrowing needs a cast
int  ok = (int) l;   // ✅ you asked for it
```

**Why the asymmetry?** Every `int` fits in a `long`, so widening is always safe. Narrowing might not fit, so Java refuses to do it behind your back. The cast is you saying *"I know, do it anyway."*

### 3b. A cast is a promise, not a conversion

The single most important idea in the module.

```java
(byte) 300   ->  44      // kept only the low 8 bits
(byte) 130   ->  -126    // past 127, wrapped
(int) 99.99  ->  99      // TRUNCATED — not rounded
(int) -99.99 ->  -99     // toward zero, not down
```

**A cast does not make the value fit. It makes the compiler stop objecting.** The data loss still happens — you have just signed for it.

> **Analogy.** A cast is not a funnel that pours 310 ml into a 100 ml cup. It is a **waiver you sign** saying "I accept that the extra 210 ml goes on the floor." The spill happens either way; the signature just means nobody warns you.

To round instead of truncate, say so: `Math.round(99.99)` is `100`.

### 3c. Promotion — why `byte + byte` is not a `byte`

```java
byte x = 10, y = 20;
byte sum = x + y;          // ❌ won't compile
byte sum = (byte)(x + y);  // ✅
```

> **In any arithmetic expression, `byte`, `short` and `char` are first promoted to `int`.**

The CPU works in 32-bit words; there is no "byte addition" instruction. So `x + y` has type `int`, and assigning an `int` to a `byte` is narrowing.

This is also the real reason behind two earlier surprises: `'A' + 1` is `66` (an `int`), and `small += 300` compiles because `+=` inserts the cast the promotion made necessary.

**Mixed types:** if either operand is `double`, the whole expression is `double`; else if either is `float`, it is `float`; else if either is `long`, it is `long`; **otherwise everything becomes `int`.**

### 3d. The compiler helps — but only when it can see the value

```java
byte ok      = 100;         // ✅ literal, fits, checked at compile time
byte no      = 200;         // ❌ literal, does not fit — rejected
final int c  = 100;
byte alsoOk  = c;           // ✅ final and known at compile time
int  v       = 100;
byte needs   = v;           // ❌ v is a variable — value unknown at compile time
byte fine    = (byte) v;    // ✅ with a cast
```

The value is 100 either way, but implicit narrowing is permitted **only when the compiler can prove the value**. A plain `int` variable could hold anything by the time it runs.

### 3e. Widening is not always lossless

Widening is safe for **range**, not always for **precision**:

```java
int precise = 16777217;    // 2^24 + 1
float f = precise;         // widening — no cast required
// f is 1.6777216E7 — the +1 is GONE
```

`float` has 32 bits but only ~24 of significant digits; the rest hold the exponent. Past 2^24 it cannot count by ones. Same for `long` -> `double` past 2^53.

### 3f. `double` -> `int` saturates; `int` arithmetic wraps

Two different failure modes:

```java
(int) 1e20        ->  2147483647   // clamped to Integer.MAX_VALUE
(int) -1e20       -> -2147483648   // clamped to MIN_VALUE
(int) Double.NaN  ->  0            // NaN becomes zero

Integer.MAX_VALUE + 1  ->  -2147483648   // WRAPS to the opposite end
```

**Casting a too-big `double` clamps. Integer overflow wraps.** Opposite behaviours.

### 3g. Text is not a number

`String` is not on the ladder at all — no cast crosses it:

```java
String s = "123";
int n = (int) s;                 // ❌ will not compile
int n = Integer.parseInt(s);     // ✅ 123
String back = String.valueOf(n); // ✅ "123"

"123" + 1   ->  "1231"           // ⚠️ + on a String CONCATENATES
```

Parsing can fail **at run time**: `Integer.parseInt("12a")` throws `NumberFormatException`.

---

## 4. Internal working — verified on this machine (JDK 25.0.3)

From [`Conversion.java`](../../code/phase-01-java-fundamentals/m4-casting/Conversion.java):

```
(int) 99.99  = 99   <- TRUNCATES, does not round
(byte) 300   = 44   <- kept only the low 8 bits
(byte) 130   = -126 <- overflowed past 127

int   16777217 -> float 1.6777216E7   <- lost the +1!
back to int    -> 16777216
long  123456789123456789 -> double 1.2345678912345678E17

(int) 1e20        = 2147483647   <- clamped to Integer.MAX_VALUE
(int) Double.NaN  = 0            <- NaN becomes 0

Integer.parseInt("123") + 1 = 124
"123" + 1 (String concat)   = 1231   <- NOT arithmetic
Integer.parseInt("12a")     -> java.lang.NumberFormatException: For input string: "12a"
```

### 4b. Where overflow actually bites

From [`Overflow.java`](../../code/phase-01-java-fundamentals/m4-casting/Overflow.java):

```
milliseconds in a day  = 86400000  (fits in int)
days until int overflow= 24  <- only 24 days!
as int : 30 days in ms = -1702967296   <- WRONG, negative
as long: 30 days in ms = 2592000000    <- correct
```

**An `int` holding milliseconds overflows after 24 days.** Any timeout, cache TTL or duration in milliseconds must be `long`. This is why `System.currentTimeMillis()` returns a `long`.

```
(long)(2000000000 + 2000000000) = -294967296   <- too late, already wrapped
2000000000L + 2000000000        = 4000000000   <- widen an OPERAND first
```

### 4c. Making overflow loud

```
Integer.MAX_VALUE + 1        = -2147483648   (silent)
Math.addExact(MAX, 1)        -> ArithmeticException: integer overflow   (loud)
Math.multiplyExact(1e5, 1e5) -> ArithmeticException: integer overflow
Math.toIntExact(3000000000L) -> ArithmeticException: integer overflow
```

`Math.toIntExact(long)` is the safe `long` -> `int` narrowing: it throws rather than silently truncating. Use the exact-arithmetic methods for money, inventory, anything where a silently wrong number is worse than a crash. **A thrown exception is a bug you find; a wrapped integer is a bug you ship.**

### 4d. The overflow hiding inside a negation

```
MIN / -1 = -2147483648   <- no exception, it wrapped
```

`Integer.MIN_VALUE` is -2,147,483,648 but `MAX_VALUE` is only +2,147,483,647 — the negative range is one wider. So `-MIN_VALUE` has no representable answer and quietly returns `MIN_VALUE` itself: a negative number that is its own negation. `Math.negateExact` catches it.

---

## 4e. Where to put the cast — the rule that took four attempts

Two lines that look identical and need **opposite** treatment:

```java
byte nextLevel = (byte)(level + 1);              // ✅ brackets NEEDED
long allViews  = (long) totalViews + newViews;   // ✅ brackets WRONG
```

Because they travel in opposite directions on the ladder:

```
   NARROWING (down)  ->  do the maths first, THEN shrink
        (byte)(level + 1)        nothing is lost during the addition;
                                 the int result 6 fits in a byte fine

   WIDENING  (up)    ->  grow FIRST, then do the maths
        (long) totalViews + b    because the arithmetic ITSELF is what overflows
```

And the two ways to get it wrong, both seen live:

```java
(long)(totalViews + newViews)   // ❌ the int addition already wrapped; the cast
                                //    faithfully converts a wrong number
(byte) level + 1                // ❌ a cast binds tighter than + (Day 009 precedence:
                                //    cast is level 2, + is level 4), so this is
                                //    ((byte) level) + 1 — an int again
```

> **One sentence covering both: put the cast wherever it PREVENTS the loss.**
> Narrowing back down at the end is harmless. Doing arithmetic in a type too small for it is not.

---

## 5. Real-world usage

```java
long timeoutMs = 30L * 24 * 60 * 60 * 1000;   // the L is load-bearing — int overflows at 24 days
int  userId    = Math.toIntExact(idFromDb);   // throws rather than silently truncating
long cents     = Math.round(price * 100);     // round, don't truncate — (long) would lose a cent
int  age       = Integer.parseInt(request.getParameter("age"));  // can throw — must be handled
```

That last line is the shape of every HTTP handler from Phase 7 onward: **input arrives as text, and parsing is a step that can fail.** Handling `NumberFormatException` is the difference between a 400 Bad Request and a 500 crash.

---

## 6. Interview perspective

**Standard**
1. Widening vs narrowing — which needs a cast, and why?
2. Why does `byte a = 1, b = 2; byte c = a + b;` not compile?
3. What does `(int) 3.99` give?

**Tricky follow-ups**
- *"`long total = a + b;` where both are `int` — safe?"* → **No.** The addition happens in `int` and can overflow before the widening. Cast an operand: `(long) a + b`.
- *"Is widening always lossless?"* → No. `int`->`float` and `long`->`double` lose precision past 2^24 / 2^53.
- *"`(int) 1e20` vs `Integer.MAX_VALUE + 1`?"* → The cast **clamps** to `MAX_VALUE`; the arithmetic **wraps** to `MIN_VALUE`.
- *"How do you make overflow fail loudly?"* → `Math.addExact` / `multiplyExact` / `toIntExact`.
- *"Why does `byte b = 100;` compile but `byte b = someInt;` not, when `someInt` is 100?"* → The literal is a compile-time constant the compiler can verify; a variable's value is unknown until run time.
- *"Can you put `L` on a variable to make it a `long`?"* → **No.** `L` is a *literal* suffix. A variable already has a type; use a cast.

**Misconceptions**
- ❌ "A cast converts the value safely." → It suppresses the compiler's objection. The loss still happens.
- ❌ "`(int) 3.99` rounds to 4." → It truncates to 3. Use `Math.round`.
- ❌ "Declaring the result `long`/`double` protects the arithmetic." → The operator already ran. Cast an **operand**.
- ❌ "Overflow throws an exception." → Integer overflow is **silent**. Only `Math.*Exact` throws.
- ❌ "`totalViewsL` / `totalViews L` makes it a long." → The `L` suffix applies to literals only.

---

## 7. Best practices

1. **Cast an operand, not the result** — when widening. When narrowing, bracket the maths and shrink at the end.
2. **Use `long` for milliseconds, IDs, byte counts and money-in-cents.** An `int` of milliseconds dies after 24 days.
3. **`Math.round` to round, `(int)` to truncate** — pick deliberately.
4. **`Math.toIntExact` for `long` -> `int`** wherever a wrong value would matter.
5. **Treat parsing as fallible.** `Integer.parseInt` on user input needs a plan for `NumberFormatException`.
6. **Do not sprinkle casts to silence errors.** A cast the compiler demanded is a question: *am I sure this fits?*

---

## 8. Summary card

- **Ladder:** `byte -> short -> int -> long -> float -> double`, `char` joining at `int`. **Up = automatic. Down = explicit cast.**
- **A cast is a promise, not a fix.** `(byte) 300` is `44`; `(int) 99.99` is `99` (truncated).
- **`byte`/`short`/`char` are promoted to `int` in every expression.**
- Mixed types: any `double` -> all `double`; else any `float`; else any `long`; **else `int`**.
- Implicit narrowing only for **compile-time constants**: `byte b = 100;` ✅, `byte b = someInt;` ❌.
- **Widening can lose precision:** `int`->`float` past 2^24, `long`->`double` past 2^53.
- **`double`->`int` clamps** (and `NaN`->`0`); **integer arithmetic wraps.**
- **`long ms` for durations** — an `int` of milliseconds overflows in **24 days**.
- **`Math.addExact` / `multiplyExact` / `toIntExact` throw** instead of wrapping.
- **`String` is not on the ladder.** `Integer.parseInt` / `String.valueOf`; `"123" + 1` is `"1231"`.
- **`L` is a literal suffix, not something you attach to a variable.** Cast the variable instead.
- **Put the cast wherever it PREVENTS the loss** — widen before the maths, narrow after it.

---

# 🎯 INTERACTIVE CHECK — answers reviewed

**Q1.** Why does `long allViews = totalViews + newViews;` still overflow?
The addition runs in `int` first and wraps; the widening happens afterwards, too late. Fix: `(long) totalViews + newViews`.
*Correction from the session:* `L` cannot be attached to a **variable** — it is a literal suffix. Widen a variable with a cast.

**Q2.** `byte a = 10, b = 20; System.out.println(a + b);` → **C) `30`, and the expression's type is `int`** ✅

**Q3.** `(int) 7.9`, `(int) -7.9`, `Math.round(7.9)`, `(byte) 200`, `(int) 1e20` → `7, -7, 8, -56, 2147483647` — **5/5** ✅ including clamping vs wrapping.

**Q4.** Why does `byte ok = 100;` compile but `byte bad = v;` not? ✅
The literal is verifiable at compile time; a variable's value is not known until run time, so Java demands the waiver.

**Q5.** 45-day TTL in milliseconds. `45L * 24 * 60 * 60 * 1000` makes the *arithmetic* a `long` ✅ — but the destination must widen too:
```java
long ttl = 45L * 24 * 60 * 60 * 1000;   // `int ttl = ...` is a compile error
```
**Widening the arithmetic and widening the destination are two separate fixes.**

---

# 🐞 DEBUGGING EXERCISE — solved

Four bugs — two compile errors, two silently wrong — plus one correct line planted as a decoy. Solved version: [`Report.java`](../../code/phase-01-java-fundamentals/m4-casting/Report.java), verified `javac` exit 0 and printing:

```
stars = 5
2400000000 75.0 6 42
```

| Line | Category | Fix |
|---|---|---|
| `long allViews = totalViews + newViews;` | silently wrong | `(long) totalViews + newViews` |
| `double scorePercent = 45 / 60 * 100;` | silently wrong | `(double) 45 / 60 * 100` |
| `byte nextLevel = level + 1;` | compile error | `(byte)(level + 1)` |
| `int count = countText;` | compile error | `Integer.parseInt(countText)` |
| `int stars = (int) Math.round(rating);` | **not a bug** | `Math.round(double)` returns `long`, so the cast is required |

**Route taken:** the first attempt did not compile (`L` attached to an `int` variable, and `(byte) level + 1` defeated by precedence). The second attempt compiled and ran while still printing `-1894967296` and `0.0` — both casts had been moved *outside* the brackets, converting numbers that were already wrong. See §4e for the rule that resolves it.

---

# 📝 HOMEWORK

1. Run both demos:
   ```
   cd code/phase-01-java-fundamentals/m4-casting
   java Conversion.java
   java Overflow.java
   ```
2. Write `Truncate.java` proving `(int)` truncates while `Math.round` rounds, for `2.4`, `2.5`, `2.6`, `-2.5`. The `-2.5` case will surprise you — explain it.
3. Write `MsOverflow.java` computing "days in milliseconds" for 10, 24, 25 and 30 days **as `int`**, then again as `long`. Find the exact day it breaks.
4. Wrap `Math.addExact(Integer.MAX_VALUE, 1)` in `try/catch` and print a useful message — your first deliberate error handler.

## Next session preview

**Phase 1 · Module 5 — Control Flow: `if`/`else` and `switch`.** The branches you have been writing in pseudocode since Day 006 finally become real Java, including the dangling-else trap, `switch` fall-through, and the modern arrow-form `switch` that removes both.
