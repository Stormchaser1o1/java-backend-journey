# Day 009 — Operators

**Phase 1 · Module 3 · 2026-08-12**

> Prerequisite: [Day 002 — Binary](../phase-00-computer-fundamentals/day-002-binary-and-data-representation.md) and [Day 008 — Variables & Data Types](day-008-variables-and-data-types.md)

---

## 1. Motivation

Day 008 covered how to *store* data. Today: how to *do things with it*. Operators are the verbs of the language — every calculation, condition and loop test in every program is built from these symbols.

Second payoff: Day 002's bitwise thinking has been theory until now. Today `&`, `|`, `^`, `<<` and `>>` manipulate individual bits directly, with the binary printed next to every answer.

---

## 2. The problem

Given `int totalCents = 2500;` and `int itemCount = 7;`, find the average price. The obvious line:

```java
double average = totalCents / itemCount;
```

Compiles. Runs. Prints **`357.0`** — and the true answer is **357.14285714285717**. No error, no warning, a wrong number heading into an invoice. Understanding why is this whole module.

---

## 3. The concept

### 3a. The five families

| Family | Operators | Produces |
|---|---|---|
| **Arithmetic** | `+` `-` `*` `/` `%` `++` `--` | a number |
| **Relational** | `==` `!=` `<` `>` `<=` `>=` | a **`boolean`** |
| **Logical** | `&&` `\|\|` `!` | a **`boolean`** |
| **Bitwise** | `&` `\|` `^` `~` `<<` `>>` `>>>` | a number (bit pattern) |
| **Assignment** | `=` `+=` `-=` `*=` `/=` `%=` | stores, and yields the value |

Plus the **ternary**, the only operator with three operands:

```java
int max = (a > b) ? a : b;    // "if a > b then a else b"
```

### 3b. `=` vs `==`

```java
if (x = 5)     // ❌ ASSIGNS 5 to x, then tries to use 5 as a condition
if (x == 5)    // ✅ COMPARES
```

In C this compiles and causes legendary bugs. **In Java it usually doesn't**, because `if` demands a `boolean` and `x = 5` yields an `int`:

```
error: incompatible types: int cannot be converted to boolean
```

But it *does* compile when the variable is already `boolean` — `if (flag = true)` is legal and always true. Watch for that one.

### 3c. Integer division — the trap from §2

```java
double average = totalCents / itemCount;   // 2500 / 7
```

In the order the machine works:

```
   ① 2500 / 7        both operands are int  →  int division  →  357  (remainder discarded)
   ② double = 357    NOW it becomes a double  →  357.0
```

**The damage is done before the assignment.** Promoting to `double` afterwards cannot recover the `.14285…` — it was discarded in step ①.

```java
double average = (double) totalCents / itemCount;   // ✅ 357.14285714285717
```

**The rule: an operator looks only at its own operands.** `int op int` → `int`. What you assign the result to is irrelevant. **Cast an operand, not the result.**

### 3d. `%` and negatives

The sign of `%` follows the **left** operand, and `/` truncates **toward zero**:

```
-7 / 2  = -3      (not -4 — toward zero, not downward)
-7 % 2  = -1
 7 % -2 =  1
```

Everyday use: `n % 2 == 0` means "n is even."

### 3e. `++` and `--` — position changes the value

```java
int i = 5;  System.out.println(i++);   // prints 5, then i becomes 6   ← POST: use, then change
int j = 5;  System.out.println(++j);   // j becomes 6, then prints 6   ← PRE:  change, then use
```

Both leave the variable at 6; they differ in **what the expression evaluates to**. Standalone on their own line they are identical.

### 3f. Short-circuiting

`&&` and `||` **stop as soon as the answer is known**; `&` and `|` always evaluate both sides.

```java
false && anything    // already false — right side NEVER RUNS
true  || anything    // already true  — right side NEVER RUNS
```

This is a **correctness tool**, not an optimisation:

```java
if (s != null && s.length() > 0)    // ✅ safe
if (s != null &  s.length() > 0)    // 💥 NullPointerException
if (s.length() > 0 && s != null)    // 💥 NPE — guard uselessly placed AFTER the use
```

**Always put the guard first, and always use `&&`.** See §4b for the proof.

### 3g. Bitwise — Day 002 becomes executable

With `x = 12` (`1100`) and `y = 10` (`1010`):

```
            1100   (12)
            1010   (10)
   x & y  = 1000   ( 8)   AND — 1 only where BOTH are 1
   x | y  = 1110   (14)   OR  — 1 where EITHER is 1
   x ^ y  = 0110   ( 6)   XOR — 1 where they DIFFER
   ~x            = -13    NOT — flips every bit (watch the sign)
```

Shifts are multiplication and division by powers of two:

```
   5 << 1  = 10      × 2
   5 << 3  = 40      × 8
  40 >> 2  = 10      ÷ 4
```

And the distinction that matters on negatives:

```
  -8       = 11111111 11111111 11111111 11111000
  -8 >> 1  = 11111111 11111111 11111111 11111100  = -4          ← keeps the sign bit
  -8 >>> 1 = 01111111 11111111 11111111 11111100  = 2147483644  ← forces in a 0
```

`>>` preserves sign (arithmetic shift); `>>>` does not (logical shift). There is no `<<<`.

### 3h. Compound assignment hides a cast

```java
byte small = 10;
small = small + 300;   // ❌ won't compile: int can't be assigned to byte
small += 300;          // ✅ compiles... and gives 54
```

**`a += b` is exactly `a = (type of a)(a + b)`.** See §4d.

### 3i. Precedence — the practical subset

```
   HIGH   ①  ()          ②  ++ -- ! ~ (cast)     ③  * / %      ④  + -
          ⑤  << >> >>>   ⑥  < > <= >=            ⑦  == !=
          ⑧  &   ⑨  ^   ⑩  |   ⑪  &&   ⑫  ||   ⑬  ?:
   LOW    ⑭  =  +=  -=  *=  /=  %=
```

Memorise **two facts** — `*` `/` `%` bind tighter than `+` `-`, and `&&` binds tighter than `||` — and **bracket everything else**.

> ⚠️ **Preview warning:** `==` on `String` compares *identity*, not contents. Use `.equals()`. Module 8 explains why.

---

## 4. Internal working — verified on this machine (JDK 25.0.3)

### 4a. Arithmetic surprises

From [`Arithmetic.java`](../../code/phase-01-java-fundamentals/m3-operators/Arithmetic.java):

```
-7 / 2  = -3    <- truncates TOWARD ZERO, not down
-7 % 2  = -1    <- sign follows the LEFT operand
 7 % -2 = 1

7.0 / 0 = Infinity   <- double: no crash
0.0 / 0 = NaN        <- double: no crash
7 / 0   = java.lang.ArithmeticException: / by zero   <- int: RUN-TIME exception

2 + 3 * 4     = 14    <- not 20
100000 * 100000 as int  = 1410065408  <- WRONG, overflowed
100000L * 100000 as long = 10000000000   <- correct
```

**Division by zero splits by type.** IEEE-754 defines `Infinity` and `NaN`, so floating point does not crash. Integer division by zero throws. And critically: **`int x = 7 / 0;` compiles perfectly** — a run-time failure on a `.class` file that exists. The Day 008 distinction in a fresh disguise.

**Overflow strikes mid-expression.** `100000 * 100000` overflows *during* the multiplication; assigning to a `long` afterwards cannot help — the same shape as the integer-division trap. Fix by making an operand a `long` **first**: `100000L * 100000`.

### 4b. Short-circuiting, caught in the act

From [`Explained.java`](../../code/phase-01-java-fundamentals/m3-operators/Explained.java), where a helper announces every check Java actually performs:

```
--- with &&  (short-circuit) ---
      >>> Java RAN: name != null
   survived, no crash

--- with &   (no short-circuit) ---
      >>> Java RAN: name != null
   NullPointerException!
```

**Both evaluated the LEFT side first. Java is always left to right** — that is never the difference. The difference is whether the **right side runs at all**.

> **Analogy — two security guards.** Guard 1: *"Is anybody here?"* Guard 2: *"Is that person taller than 3 feet?"*
> With `&&`, Guard 1 shouts *"NOBODY HERE"* and Guard 2 **goes home** — the answer is settled.
> With `&`, Guard 2 must do the job regardless, so they walk up to empty air and measure a person who does not exist. **That is the crash.**

Why is the answer "settled"? `false && anything` is `false` — one false side decides the result, so checking the other gains nothing. `&&` exploits that; `&` ignores it. Same for `true || anything`.

### 4c. The binary-search midpoint bug

Also from `Explained.java` — a search narrowed to between indices 2,000,000,000 and 2,100,000,000:

```
low            = 2000000000
high           = 2100000000
Integer.MAX    = 2147483647
true low+high  = 4100000000        <- the real mathematical answer
low + high     = -194967296        <- OVERFLOWED, went negative

(low+high) / 2   = -97483648    ❌ negative index -> crash
(low+high) >>> 1 = 2050000000   ✅ exactly the true midpoint
```

`low + high` is broken *before* any division. `>>>` rescues it because **the bits were never wrong — only the interpretation was**:

```
  bits sum      = 11110100 01100001 00001001 00000000
                  ▲ this leading 1 IS the "4 billion" part. But a signed int
                    reads a leading 1 as "negative", so Java sees -194,967,296.

  bits sum >> 1 = 11111010 00110000 10000100 10000000  = -97483648    ❌ keeps the 1
  bits sum >>>1 = 01111010 00110000 10000100 10000000  = 2050000000   ✅ forces a 0 in
```

`/ 2` behaves like `>>` — it preserves the sign, faithfully halving a number that was already misread.

> **Analogy.** A car odometer rolls past its maximum and shows a small number. `/ 2` is the mechanic who trusts the reading and says "nearly new". `>>>` is the mechanic who knows it rolled over and adds the missing digit back.

This was a real bug in Java's own `Arrays.binarySearch()`, shipped undetected for **nine years** — it only triggers on arrays over ~1 billion elements.

### 4d. Why `+=` gives 54

```
byte small = 10;
small + 300 as an expression = 310   (an int)
after  small += 300;   small = 54
proof: (byte) 310 = 54
310 bits      = 00000000 00000000 00000001 00110110
lowest 8 bits = 00110110 = 54
```

```
   small += 300;      is EXACTLY      small = (byte)(small + 300);
                                            ▲
                                            └─ a cast you never typed
```

`small = small + 300` has **no** cast, so Java stops you (*"possible lossy conversion"*) — it forces you to acknowledge the loss. `small += 300` **already contains** one, so Java assumes you meant it and stays silent.

> **Analogy.** `small = small + 300` is pouring 310 ml into a 100 ml cup with the manager watching — they stop you. `small += 300` is the same pour into a cup with an automatic overflow drain: nobody stops you, and you don't notice the loss until you check what's left.

This only bites on `byte`, `short` and `char`. On `int` and `long` — 99% of real code — it never comes up.

---

## 5. Real-world usage

```java
if (user != null && user.isActive() && user.getRole() == Role.ADMIN) { ... }
```
Three guards, left to right, each protecting the next. Reorder them and you get a production NPE.

```java
if (page % 2 == 0) { ... }                  // even/odd
int index = hash & (capacity - 1);          // HashMap's real bucket calculation
int mid = (low + high) >>> 1;               // overflow-safe midpoint (see 4c)
long cents = Math.round(price * 100);       // money — never stored as double
```

---

## 6. Interview perspective

**Standard**
1. Difference between `&` and `&&`?
2. `i++` vs `++i`?
3. What does `%` do, and what is the sign of `-7 % 2`?

**Tricky follow-ups**
- *"Why is `double avg = 5 / 2;` equal to 2.0?"* → `int / int` is integer division; the promotion to `double` happens after the truncation.
- *"`-8 >> 1` vs `-8 >>> 1`?"* → `-4` and `2147483644`. `>>` preserves the sign bit; `>>>` shifts in zeros.
- *"Does `byte b = 10; b += 300;` compile?"* → Yes, giving 54 — `+=` performs an implicit narrowing cast.
- *"`1/0` vs `1.0/0`?"* → `ArithmeticException` vs `Infinity`. **Both compile**; only the integer one fails, at run time.
- *"Why `>>> 1` rather than `/ 2` for a binary-search midpoint?"* → `low + high` can overflow to negative; `>>>` restores the correct reading of the bits, `/ 2` faithfully halves the wrong one.

**Misconceptions**
- ❌ "`&&` and `&` are interchangeable for booleans." → Same result, different evaluation. Only `&&` short-circuits, which is what makes null-guards work.
- ❌ "`&` crashes because it evaluates right-to-left." → **Java is always left to right.** The difference is whether the right side is evaluated *at all*.
- ❌ "Assigning to a `double`/`long` fixes the arithmetic." → The operator already ran. Cast an *operand*.
- ❌ "`^` is exponentiation." → It is XOR. Java has no power operator; use `Math.pow()`.
- ❌ "`==` on objects compares contents." → It compares references. Module 8.

---

## 7. Best practices

1. **Bracket anything non-obvious** — two characters, zero doubt.
2. **Always `&&` / `||` on booleans**, never `&` / `|`, unless you specifically need both sides evaluated.
3. **Guard first:** `x != null && x.foo()`, never the reverse.
4. **Cast an operand, not the result:** `(double) a / b`, not `(double)(a / b)`.
5. **Don't cram `++` into larger expressions.** Give it its own line.
6. **Use `%` for divisibility**, remembering the sign follows the left operand.
7. **Compiling is not correctness** — check the output against what it *should* be.

---

## 8. Summary card

- **`int op int` → `int`.** `2500 / 7 == 357`. Cast an **operand**: `(double) a / b`.
- `=` assigns, `==` compares. Java catches `if (x = 5)` — **except** when `x` is already `boolean`.
- `i++` uses the old value then increments; `++i` increments **first**, then uses. Both end at the same value.
- **`&&`/`||` short-circuit; `&`/`|` don't.** Evaluation is **always left to right**; short-circuiting decides whether the right side runs.
- `%` sign follows the **left** operand; `/` truncates **toward zero** (`-7 / 2 == -3`).
- **Bitwise:** `&` both, `|` either, `^` differ, `~` flip. `<< n` = ×2ⁿ, `>> n` = ÷2ⁿ. `>>` keeps the sign, `>>>` shifts in zeros.
- **`a += b` is `a = (type of a)(a + b)`** — a hidden narrowing cast. `byte b = 10; b += 300;` → `54`.
- **`7 / 0` throws at run time; `7.0 / 0` is `Infinity`.** Both compile.
- Overflow happens **during** the expression — `100000 * 100000` is wrong even when assigned to a `long`.
- Precedence: `*` `/` `%` before `+` `-`; `&&` before `||`. **Bracket the rest.**

---

# 🎯 INTERACTIVE CHECK — answers reviewed

**Q1.** Why doesn't declaring `avg` as `double` fix `7 / 2`? ✅
Division runs first on two `int` operands and truncates; the promotion happens afterwards, too late. Fix: `(double) 7 / 2` — cast the **operand**.

**Q2.** `int i = 10; int j = i++ + ++i;` → **A) `12 22`** ✅ (verified).
Correction to the reasoning: `++i` increments **first** and hands over the **new** value.
`i++` → hands over 10, i becomes 11. `++i` → i becomes 12, hands over 12. `10 + 12 = 22`, i ends at 12.

**Q3.** `6 & 3`, `6 | 3`, `6 ^ 3`, `6 << 2`, `-16 >> 2` → `2, 7, 5, 24, -4` — **5/5** ✅

**Q4.** Which crashes, `&` or `&&`? → `&` ✅, but the stated reason was wrong.
**Java always evaluates left to right.** `&` crashes because it evaluates the right side *even when the answer is already decided* — see §4b.

**Q5.** Why `>>> 1` over `/ 2` for a midpoint? → Overflow to negative, `>>>` fixes it ✅; full mechanism in §4c.

---

# 🐞 DEBUGGING EXERCISE — 4/4

Four bugs, of which **only one was a compile error** — the other three compiled perfectly:

```java
double average = totalCents / itemCount;        // 1. SILENTLY WRONG — integer division
boolean hasItems = itemCount = 0;               // 2. COMPILE ERROR  — `=` should be `!=`
if (coupon.length() > 0 & coupon != null)       // 3. RUN-TIME CRASH — NPE: guard on the wrong
                                                //    side, and `&` doesn't short-circuit
byte discount = 100;  discount += 100;          // 4. SILENTLY WRONG — byte overflow to -56
```

Final version verified: `javac` exit 0, and

```
357.14285714285717 true 200
```

**The lesson of this exercise:** the first submission compiled *and ran* while still printing `false` and `-56`. A program that compiles and runs is not a program that is correct — **check the output against what it should be.** Bug 2 was the hard one: the compile error was a symptom, and the disease was the wrong logic. Silencing the error (`hasItems = false`) makes the squiggle vanish while freezing in the wrong answer.

---

# 📝 HOMEWORK

1. Run all three demos:
   ```
   cd code/phase-01-java-fundamentals/m3-operators
   java Arithmetic.java
   java LogicAndBits.java
   java Explained.java
   ```
2. Write `Even.java` — declare an `int`, print whether it's even or odd using `%` and the ternary, in a single `System.out.println`.
3. Predict on paper, then run:
   ```java
   System.out.println(10 / 3);
   System.out.println(10 % 3);
   System.out.println(10.0 / 3);
   System.out.println((double) 10 / 3);
   System.out.println((double) (10 / 3));
   ```
   The last two differ — explain why in one sentence.
4. Write `Bits.java` for `int x = 25`, printing `x`, `x << 1`, `x >> 1`, `x & 1` and `~x`, each with `Integer.toBinaryString(...)` alongside. Then answer: what does `x & 1` tell you about a number?

## Next session preview

**Phase 1 · Module 4 — Type Conversion, Casting, and Overflow.** Today's `(double)` cast, the hidden `+=` truncation and the midpoint overflow stop being side notes and become the main subject: widening vs narrowing, implicit promotion rules, and how to make overflow fail loudly instead of silently.
