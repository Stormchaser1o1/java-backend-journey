# Day 008 — Variables, Data Types, and Literals

**Phase 1 · Module 2 · 2026-08-10**

> Prerequisite: [Day 002 — Binary & Data Representation](../phase-00-computer-fundamentals/day-002-binary-and-data-representation.md) and [Day 007 — First Java Program](day-007-first-java-program.md)

---

## 1. Motivation

Day 002 established that RAM is a giant array of numbered boxes holding bit patterns, and that the *same* bit pattern means different things depending on how you agree to read it. Day 007 produced a program that could only print a fixed string — it couldn't remember anything.

Today those meet. A **variable** is how you claim one of those boxes, give it a human name, and declare *in advance, in writing* how its bits are to be interpreted.

---

## 2. The problem

Programs need to remember things: a port number, an age, a price, whether a login succeeded. RAM can hold them, but RAM addresses look like `0x7ffe4a3c`, and the CPU has no idea whether the 32 bits there are a number, a letter, or a flag.

So you need a way to say: **"Reserve me some memory, call it `age`, and treat what's in it as a whole number."** That sentence *is* a variable declaration.

---

## 3. The concept

### 3a. What a variable actually is

```
        YOU WRITE                          WHAT THE MACHINE DOES
   ┌────────────────────┐
   │  int age = 25;     │  ────────────►   ┌──────────────────────────┐
   └────────────────────┘                  │  address 0x7ffe4a3c      │
      │    │      │                        │  ┌────────────────────┐  │
      │    │      └── the VALUE            │  │ 00000000 00000000  │  │
      │    └────────── the NAME  ("age")   │  │ 00000000 00011001  │  │ 32 bits
      └─────────────── the TYPE ("int")    │  └────────────────────┘  │
                                           │        = 25              │
                                           └──────────────────────────┘
```

**The type is a promise about how to read the bits.** It is not decoration. `int age` promises "these 32 bits are a signed whole number," and Java holds you to that promise **at compile time**. This is what *statically typed* means.

> **Analogy.** A variable is a labelled jar on a shelf. The **label** is the name, the **jar's shape** is the type (a coin jar won't take soup, and the shop refuses to sell you the wrong lid), and the **contents** are the value — the only part that can change.

### 3b. Three separate operations

```java
int age;             // 1. DECLARATION  — reserve the box, name it, fix its type
age = 25;            // 2. ASSIGNMENT   — put a value in the box
int score = 100;     // 3. DECLARATION + INITIALISATION in one line (the usual way)

age = 26;            // assignment again — box re-used, NO `int` this time
int age = 26;        // ❌ ERROR: variable age is already defined
```

**The type is written exactly once, when the variable is born.**

`=` is **not** mathematical equality. It means *"take the value on the right, put it in the box on the left."* Read it right-to-left. Day 006 pseudocode used `<-` for exactly this reason.

### 3c. The 8 primitive types

| Type | Bits | Bytes | Range | Use it for |
|---|---|---|---|---|
| `byte` | 8 | 1 | −128 … 127 | raw binary data, files, network bytes |
| `short` | 16 | 2 | −32,768 … 32,767 | rarely used in practice |
| **`int`** | 32 | 4 | −2,147,483,648 … 2,147,483,647 | **the default for whole numbers** |
| `long` | 64 | 8 | ±9.22 × 10¹⁸ | IDs, ms timestamps, money-in-cents |
| `float` | 32 | 4 | ~7 significant digits | rarely used — graphics, tight memory |
| **`double`** | 64 | 8 | ~15 significant digits | **the default for decimals** |
| `char` | 16 | 2 | 0 … 65,535, **unsigned** | a single character |
| `boolean` | ~1* | ~1* | `true` / `false` | flags, conditions |

\* `boolean` has **no guaranteed size** — the JVM spec deliberately leaves it unspecified. A real interview trick question.

The ranges are Day 002's arithmetic, not trivia: a signed *n*-bit box holds −2ⁿ⁻¹ … 2ⁿ⁻¹−1. The asymmetry (−128 but only +127) exists because zero occupies one slot on the positive side.

**In practice: `int`, `long`, `double`, `boolean`, `char`.** The other three are situational.

### 3d. Literals

A **literal** is a raw value written straight into source: `25`, `3.14`, `'A'`, `true`. Each literal has its own type, and that's where the ambushes are.

```java
long  big  = 9000000000L;   // L REQUIRED — 9000000000 alone is an `int` literal, too big
float rate = 3.14f;         // f REQUIRED — 3.14 alone is a `double` literal
double d   = 3.14;          // fine — already a double
char  c    = 'A';           // SINGLE quotes = char
String s   = "A";           // DOUBLE quotes = String  ← a different type entirely
boolean ok = true;          // the bare keyword — not "true", not 1
```

**The rule behind the suffixes:** an undecorated whole-number literal is an `int`; an undecorated decimal literal is a `double`. A suffix overrides that.

```java
long small = 100;        // ✅ no L needed — 100 is a valid int literal, and int widens to long
long big   = 3000000000; // ❌ error: integer number too large  (before `long` is even considered!)
```

That second error is subtle and worth pausing on: the compiler chokes while *reading the literal*, before it looks at the `long` on the left. `3000000000` is an `int` literal that doesn't fit in an `int`.

**Other literal forms** — all verified on this machine:

```java
int dec = 1_000_000;      // underscores for readability -> 1000000
int bin = 0b1010_1010;    // 0b prefix = BINARY   -> 170     ← Day 002, directly
int hex = 0xFF;           // 0x prefix = HEX      -> 255
int oct = 010;            // leading zero = OCTAL -> 8       ⚠️ classic trap
char u  = '\u0041';       // Unicode escape       -> A
double e = 1.5e3;         // scientific notation  -> 1500.0
```

`010` is **8**, not 10. Never pad numbers with leading zeros in Java.

### 3e. Naming — rules vs conventions

**Compiler rules:** must start with a letter, `_` or `$`; may then contain digits; cannot be a keyword; case-sensitive (`age` ≠ `Age`).

**Conventions** (the compiler doesn't care, every Java team does):

```java
int userAge;                  // ✅ camelCase for variables
int UserAge;                  // ❌ looks like a class name
int user_age;                 // ❌ Python/C style, not Java
final int MAX_RETRIES = 3;    // ✅ SCREAMING_SNAKE_CASE for constants
int a, x1, tmp;               // ❌ meaningless names
```

Code that violates Java naming conventions reads as beginner code — including in interviews.

### 3f. `final` and `var`

```java
final int MAX_USERS = 100;   // may never be reassigned
MAX_USERS = 200;             // ❌ error: cannot assign a value to final variable

var name  = "Yogender";      // Java 10+: the compiler INFERS the type
var count = 42;              // count is an int — verified: class java.lang.Integer
```

`var` is **not** dynamic typing. The variable still has one fixed type forever; you just didn't type it out. It requires an initialiser (`var x;` is an error). Use it sparingly while learning — writing the type out loud is training.

---

## 4. Internal working — proven on this machine (JDK 25.0.3)

### 4a. The type table, printed by the JVM itself

From [`DataTypes.java`](../../code/phase-01-java-fundamentals/m2-variables/DataTypes.java) — every number below came out of the JVM, none copied from a book:

```
TYPE       BITS  BYTES  RANGE                                          MY VALUE
------------------------------------------------------------------------------------------
byte          8      1  -128 .. 127                                    100
short        16      2  -32768 .. 32767                                30000
int          32      4  -2147483648 .. 2147483647                      2000000000
long         64      8  -9223372036854775808 .. 9223372036854775807    9000000000
float        32      4  ~7 decimal digits of precision                 3.14
double       64      8  ~15 decimal digits of precision                3.141592653589793
char         16      2  0 .. 65535 (a Unicode code unit)               A
boolean      1*     1*  true or false                                  true
```

### 4b. Four gotchas — each a direct consequence of Day 002

From [`Gotchas.java`](../../code/phase-01-java-fundamentals/m2-variables/Gotchas.java), real output:

```
=== 1. Integer overflow ===
Integer.MAX_VALUE      = 2147483647
Integer.MAX_VALUE + 1  = -2147483648
...no error. It silently wrapped to negative.
```

Look at the actual bits:

```
MAX     = 2147483647   bits = 0111 1111 1111 1111 1111 1111 1111 1111
MAX + 1 = -2147483648  bits = 1000 0000 0000 0000 0000 0000 0000 0000
```

Adding 1 makes every bit carry, and the carry lands in the **leftmost bit** — which in two's complement is the **sign bit**. That's why it becomes the *most negative* value rather than zero. **No exception, no warning** — just a wrong number propagating through the system. (`Math.addExact` throws instead; Phase 3.)

```
=== 2. Floating point cannot store 0.1 exactly ===
0.1 + 0.2        = 0.30000000000000004
0.1 + 0.2 == 0.3 ? false
```

0.1 in binary is an infinitely repeating fraction, exactly as 1/3 is in decimal. `double` stores a very close approximation, and errors accumulate. **Never use `double`/`float` for money.**

```
=== 3. Integer division throws away the remainder ===
7 / 2    = 3      <- not 3.5
7 / 2.0  = 3.5    <- one decimal is enough to fix it
7 % 2    = 1      <- % gives the remainder
```

`int / int` is *always* an `int`. The `.5` is **truncated**, not rounded.

```
=== 4. char is secretly a number ===
letter          = A
(int) letter    = 65
letter + 1      = 66     <- became an int!
(char)(letter+1)= B
'a' - 'A'       = 32      <- the 32 from Day 002
```

A `char` *is* a 16-bit unsigned number; Java just prints it as a glyph.
**`+ 1` → next letter (`'B'`). `+ 32` → same letter in lower case (`'a'`).**

### 4c. Day 006's `FindLargest`, now in real Java

[`FindLargest.java`](../../code/phase-01-java-fundamentals/m2-variables/FindLargest.java), real output:

```
a = 7, b = 2, c = 9
largest = 9
x = 5, y = 5, z = 3 -> largest = 5
```

Line for line against the Day 006 pseudocode:

```
   PSEUDOCODE (Day 006)              JAVA (today)
   ─────────────────────             ────────────────────────
   largest <- a                      int largest = a;      ← declare + initialise
   IF b > largest THEN               if (b > largest) {
       largest <- b                      largest = b;      ← assign only, no `int`
   END IF                            }
   RETURN largest                    System.out.println(largest);
```

The algorithm did not change at all — only the syntax. **Thinking is language-independent; syntax is the easy part learned afterwards.** The edge case dry-run by hand on Day 006 (`x=5, y=5, z=3`) still returns 5 in real Java.

*(`if` is taught properly in Module 5; it appears here only to show the mapping.)*

---

## 4d. How `javac` reports errors — the phase pipeline

Discovered by experiment while debugging this module's exercise. Compiling a file with **5 bugs** reported **1 error**, then 3, then 1 — never 5 at once. Why:

```
   Config.java  (plain text)
        │
        ▼
   ① LEX + PARSE ──── "is this valid Java grammar? can I build a tree?"
        │              ← `long x = 3000000000;` dies here — not a readable int literal
        │                ⛔ ABORT — stages ②③ never run
        ▼
   ② TYPE CHECK ───── "do the types on both sides agree?"
        │              ← `char = "A"`, `float = 0.18`, `byte = 200` all die here.
        │                Same stage, same pass → ALL THREE reported together.
        │                ⛔ ABORT — stage ③ never runs
        ▼
   ③ FLOW ANALYSIS ── "is every local assigned before use?"
        │              ← `int total;` then `println(total)` dies here
        │                ⛔ ABORT
        ▼
   Config.class     ← produced ONLY if all stages pass
```

**Two experiments that isolate this.** Same two bad lines in both files; the only difference is one semicolon:

```java
char grade = "A";        // type error          ─┐  both are stage ②
byte retries = 200;      // type error          ─┘  →  "2 errors"

char grade = "A"         // SYNTAX error (stage ①) →  "1 error"
byte retries = 200;      // type error — never even looked for
```

**A syntax error hides every type error in the file.** This is *why* Day 007's best practice "fix the first error and recompile" works: the errors you can see may be the only ones the compiler got far enough to look for. A file reporting "1 error" is not a file with one bug.

**And when `javac` reports any error, no `.class` file is produced at all** — verified with `Test-Path`. There is no bytecode, so nothing can run. Every one of these is a compile-time failure with the program sitting inert as text on disk.

---

## 5. Real-world usage

In the Spring Boot services from Phase 7 onward:

```java
private final long   userId;        // long — IDs blow past 2 billion
private final String email;         // reference type, not a primitive
private int          loginAttempts; // int is the sane default
private boolean      isActive;      // boolean for flags
private long         priceInCents;  // ⚠️ money as long cents — NEVER double
```

That money comment is not academic. Storing prices as `double` is a well-known way to produce invoices off by a cent, and it is caught in code review at every serious company.

---

## 6. Interview perspective

**Standard**
1. Name the 8 primitives with their sizes.
2. `int` vs `Integer`? *(primitive vs wrapper object — Phase 2/3)*
3. Default value of an uninitialised `int`? **Trick:** a *local* variable has **no** default — the compiler refuses to let you read it. *Fields* default to 0/`false`/`null`.

**Tricky follow-ups**
- *"Why does `0.1 + 0.2 != 0.3`?"* → Binary floating point can't represent 0.1 exactly; IEEE-754 stores the nearest approximation and the error surfaces on comparison.
- *"Size of `boolean` in Java?"* → **Unspecified by the JVM spec.** Anyone confidently saying "1 bit" is guessing.
- *"`Integer.MAX_VALUE + 1`?"* → Silent wraparound to `Integer.MIN_VALUE`; the carry lands in the sign bit. No exception.
- *"Why does `long x = 3000000000;` fail but `3000000000L` work?"* → Undecorated integer literals are `int` literals; the compiler rejects it while parsing the literal, before the assignment is considered.
- *"Is `char` signed or unsigned?"* → **Unsigned**, 0–65535. The only unsigned primitive in Java.

**Misconceptions**
- ❌ "`var` makes Java dynamically typed." → The type is inferred at *compile* time, then fixed forever.
- ❌ "`float` is more precise than `int` because it has decimals." → Different trade-off; `float` has ~7 significant digits and can't hold large integers exactly.
- ❌ "Declaring a local gives it 0." → Only *fields* get defaults; locals must be assigned before use, enforced by the compiler.
- ❌ "`'A'` and `"A"` are the same." → `char` vs `String`, completely different types.
- ❌ "A type error means the program 'couldn't run'." → It never ran. `javac` produced no `.class` file at all.

---

## 7. Best practices

1. **Default to `int` and `double`.** `long` only past ~2 billion; `byte`/`short`/`float` only for a specific reason.
2. **Name variables for what they hold** — `retryCount`, not `rc`. Code is written once, read fifty times.
3. **Initialise at declaration where you can** — `int total = 0;` beats declaring now and assigning far away.
4. **Never store money in `double`/`float`.** `long` cents or `BigDecimal`.
5. **`final` by default** for values that shouldn't change — it documents intent and lets the compiler catch mistakes.
6. **No leading zeros on numbers** — `010` is octal 8.
7. **Edit, then compile — before you call it done.** Describing a fix in a comment is not applying it.

---

## 8. Summary card

- A **variable** = named, typed box in RAM. The type is a *promise about how to read the bits*, enforced at compile time.
- **Declaration** (`int age;`) → **assignment** (`age = 25;`) → or both at once. The type is written **once**.
- `=` means "put the right side into the left box," not equality.
- **8 primitives:** `byte`(8) `short`(16) `int`(32) `long`(64) `float`(32) `double`(64) `char`(16, unsigned) `boolean`(unspecified).
- **Literal defaults:** whole number → `int`; decimal → `double`. `L` and `f` override that.
- `'A'` = char (single quotes) · `"A"` = String (double quotes).
- **Integer overflow wraps silently** — the carry lands in the sign bit. `0.1 + 0.2 != 0.3`. `7 / 2 == 3`. `'A' == 65`, and `'a' - 'A' == 32`.
- **Local variables have no default** — reading one before assignment is a compile error (*definite assignment*).
- **`javac` runs in phases:** parse → type-check → flow analysis. An early-stage failure hides all later-stage errors, and any error means **no `.class` file at all**.
- camelCase for variables, `SCREAMING_SNAKE_CASE` for `final` constants. Never use floating point for money.

---

# 🎯 INTERACTIVE CHECK — answers reviewed

**Q1.** Why does Java need types when Python doesn't?
→ The type tells the machine **how much memory to reserve** and **how to interpret the bits**. Key correction from the session: **the compiler does the type checking; the JVM does the allocating and executing.** In Python the type belongs to the *value*, not the variable, so mistakes surface at run time; in Java they're impossible to ship.

**Q2.** Which line doesn't compile? → **B**, `long b = 3000000000;` ✅
The error is `integer number too large` — the compiler fails while reading the literal, not on the assignment.

**Q3.** Output of `9/2`, `9%2`, `'A'+1`, `(char)('A'+1)` → `4`, `1`, `66`, **`B`** (answered `a` — that would need `+32`). ¾

**Q4.** Why does `Integer.MAX_VALUE + 1` go negative with no error? ✅
Correctly identified as wrapping to the *minimum*, not zero. The bit-level reason: the carry lands in the sign bit.

**Q5.** Type for a ₹499.99 price → `long` cents or `BigDecimal` ✅
Reason (the part interviewers listen for): **`double` can't represent 499.99 exactly**, and rounding errors accumulate across quantity, tax and totals into invoices off by a cent.

---

# 🐞 DEBUGGING EXERCISE — 5/5 found unaided

```java
public class Config {
    public static void main(String[] args) {
        int   port    = 8080;
        long  userId  = 3000000000;   // 1. needs L — int literal too large
        float taxRate = 0.18;         // 2. needs f — 0.18 is a double literal
        char  grade   = "A";          // 3. double quotes = String; char needs 'A'
        byte  retries = 200;          // 4. 200 > byte max (127) — use int
        int   total;                  // 5. local read before assignment
        System.out.println(total);
    }
}
```

Final working version compiles clean and prints `10000`:

```
--- javac Config.java ---
--- exit code: 0 ---
Config.class EXISTS
--- java Config ---
10000
```

**Also noticed:** `port`, `userId`, `taxRate`, `grade` and `retries` are declared but never used, and Java says nothing. **Unused local variables are perfectly legal** — the compiler won't warn you, though your IDE will.

---

# ✅ Weak area closed: compile-time vs run-time

Open since Day 007 and missed four times. Closed by running two drills on this machine rather than re-reading the explanation:

**Drill 1 — compile-time failure.** Delete a semicolon, run `javac`:
```
Test.java:3: error: ';' expected
        System.out.println("Hello, World!")
                                           ^
1 error
```
Error from **`javac`**, at the lex+parse stage. **No `.class` produced — the program never ran.**

**Drill 2 — run-time failure.** Fix the semicolon, rename `main` → `mainn`, then compile *and* run:
```
javac Test.java   →  succeeds silently, Test.class produced
java Test         →  Error: Main method not found in class Test, please define
                     the main method as:  public static void main(String[] args)
```
`javac` was happy — the code was valid Java. Only the **JVM**, looking for an entry point, failed. Note the precise wording: the **class** was found and loaded; the **method** was missing.

```
   javac  →  grammar & type errors  →  NO .class file  →  nothing runs
   java   →  needs a .class that already exists  →  missing main, bad casts,
             division by zero, nulls  →  these are RUN-TIME problems
```

**The lesson that closed it:** when unsure how Java behaves, don't reason harder — *run it*.

---

# 📝 HOMEWORK

1. Run all three programs and confirm the output:
   ```
   cd code/phase-01-java-fundamentals/m2-variables
   java DataTypes.java
   java Gotchas.java
   java FindLargest.java
   ```
2. Write `MyProfile.java` declaring a variable of **each** of the 8 primitives holding something about you, printed neatly labelled.
3. Break it three ways on purpose and write down the *exact* compiler error:
   a. `byte age = 200;`  b. `int x = 5; int x = 6;`  c. `final int LIMIT = 10; LIMIT = 20;`
4. Predict on paper *before* running, then run and explain any surprise:
   ```java
   System.out.println(0.1 + 0.2);
   System.out.println(1.0 / 3.0);
   System.out.println(10 / 3);
   System.out.println(10 / 3.0);
   ```

## Next session preview

**Phase 1 · Module 3 — Operators.** Arithmetic, relational, logical, bitwise and assignment operators — including `&`/`|`/`^`/`<<`/`>>`, which operate directly on the bit patterns from Day 002, and the short-circuit behaviour of `&&`/`||` that every backend relies on for null-safety.
