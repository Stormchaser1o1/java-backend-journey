# Day 002 — Binary: Why Computers Only Understand 0 and 1

**Phase 0 · Module 2 · 2026-08-07**

> Prerequisite: [Day 001 — What is Programming?](day-001-what-is-programming.md)

---

## 0. Day-001 recall (answered before this lesson)

| Q | Verdict |
|---|---|
| Q1 Why is a computer "stupid"? | ✅ Correct — refinement: it lacks *judgement*, not logic |
| Q2 Power cut loses unsaved work | ✅ B — RAM is volatile |
| Q3 SSD vs RAM for 20 Chrome tabs | ✅ Correct |
| Q4 Why is a computer faster at arithmetic? | ⚠️ Partly — it uses **our** logic, not "its own"; also `register` ≠ Windows `registry` |
| Q5 Algorithm vs Program | ✅ Correct |
| Debugging: ATM algorithm | ✅ 3/5 bugs found — missed: the balance check was *described but never written as a step*, and "check PIN" had no consequence branch |

**Lesson reinforced:** describing a check in your head is not the same as writing it as a step. The machine runs only what is written.

---

## 1. Motivation — why only 0 and 1?

A computer is made of **transistors** — microscopic electrical switches. A switch has exactly two reliable states:

```
  ON  = current flowing   = HIGH voltage (~5V or 3.3V) = 1
  OFF = no current        = LOW voltage  (~0V)         = 0
```

**Why not 10 states so we could use decimal directly?** Because voltage is noisy. Heat, interference and manufacturing variance make the actual voltage wobble.

```
 TWO states (what we use)          TEN states (what we don't)
 ------------------------          --------------------------
 0V ----------------- 0            0.0V = 0
     |  huge gap  |                0.5V = 1
     | = safe     |                1.0V = 2   <-- wobble of 0.3V
 5V ----------------- 1            1.5V = 3       and 2 becomes 3
                                   ...            SILENT CORRUPTION
```

With two states the gap is enormous, so a 1V wobble still reads correctly. **Binary is chosen for reliability, not for elegance.**

> A computer is, physically, just a few billion switches. Binary is simply the written form of "which switches are on."

---

## 2. The problem

If the machine only stores on/off, how do we represent a **number**, a **letter**, an **image**, a **song**, a **video call**?

Answer: **we encode everything as patterns of on/off, and agree in advance what each pattern means.** Encoding = an agreed-upon dictionary.

---

## 3. The concept — number bases

### Decimal (base 10) — what you already know

We use 10 digits (0–9) because humans have 10 fingers. There is nothing special about it mathematically.

The number **472** is not "four seven two". It is:

```
   digit:      4        7        2
   place:    100s     10s      1s
   power:    10^2     10^1     10^0

   4x100  +  7x10  +  2x1  =  400 + 70 + 2  =  472
```

**Every place is the base raised to a power.** That's the whole rule. Change the base and everything else follows.

### Binary (base 2) — the same rule with base 2

Two digits (0, 1). Place values are powers of 2:

```
   place:   128   64   32   16    8    4    2    1
   power:   2^7  2^6  2^5  2^4  2^3  2^2  2^1  2^0
```

Memorise the top row — you'll use it for the rest of your career.

### Binary → Decimal

`1011` = ?

```
   place:   8    4    2    1
   bits:    1    0    1    1
            |    |    |    |
            8  + 0  + 2  + 1   =  11
```

`1011` in binary = **11** in decimal.

### Decimal → Binary (subtraction method — easiest to learn)

Convert **13**:

```
Is 13 >= 8?  YES -> write 1, remainder 13-8 = 5
Is  5 >= 4?  YES -> write 1, remainder  5-4 = 1
Is  1 >= 2?  NO  -> write 0, remainder  1
Is  1 >= 1?  YES -> write 1, remainder  0

   place:   8    4    2    1
   bits:    1    1    0    1     ->  1101
```

Check: 8 + 4 + 0 + 1 = 13 ✅

### Decimal → Binary (divide-by-2 method — what interviewers expect)

```
13 / 2 = 6  remainder 1   <-- least significant bit
 6 / 2 = 3  remainder 0
 3 / 2 = 1  remainder 1
 1 / 2 = 0  remainder 1   <-- most significant bit

Read remainders BOTTOM to TOP:  1101
```

---

## 4. Internal working — bits, bytes and units

| Unit | Size | Holds |
|---|---|---|
| **bit** | 1 binary digit | 0 or 1 — 2 values |
| **nibble** | 4 bits | 16 values |
| **byte** | **8 bits** | **256 values (0–255)** |

**The formula: `n` bits → `2^n` possible values.**

```
 1 bit  -> 2^1 = 2         0, 1
 2 bits -> 2^2 = 4         00 01 10 11
 3 bits -> 2^3 = 8
 8 bits -> 2^8 = 256       00000000 .. 11111111
16 bits -> 2^16 = 65,536
32 bits -> 2^32 = ~4.29 billion
64 bits -> 2^64 = ~18.4 quintillion
```

**Why 8 bits per byte?** Historical: 8 bits was enough for one English character plus control codes (ASCII), and 8 is a convenient power of 2. IBM's System/360 standardised it in the 1960s and it stuck.

**Why is 1 KB 1024 bytes, not 1000?** Because computers count in powers of 2, and 2^10 = 1024 — the closest power of 2 to 1000.

```
1 KB = 1024 bytes        = 2^10
1 MB = 1024 KB           = 2^20
1 GB = 1024 MB           = 2^30
1 TB = 1024 GB           = 2^40
```

*(This is why a "500 GB" drive shows as ~465 GB in Windows: the manufacturer counted 1 GB = 1,000,000,000 bytes; Windows divides by 1024s.)*

### How text becomes bits — ASCII

An agreed dictionary mapping characters to numbers. 1 byte per character.

```
 'A' = 65  = 01000001
 'B' = 66  = 01000010
 'a' = 97  = 01100001
 '0' = 48  = 00110000
 ' ' = 32  = 00100000
```

Note `'A'`=65 and `'a'`=97 differ by exactly 32 — a single bit. That's not a coincidence; it made upper/lowercase conversion a one-bit flip on 1960s hardware.

Also note: the **character** `'0'` is the number **48**, not 0. This distinction causes real bugs.

ASCII only covers 128 characters — no Hindi, no Chinese, no emoji. So **Unicode** replaced it. Java uses **UTF-16** internally, which is why a Java `char` is **2 bytes**, not 1 — a classic interview question.

### How images become bits

An image is a grid of **pixels**. Each pixel is 3 bytes: Red, Green, Blue, each 0–255.

```
  Pixel = ( R , G , B )
          (255,  0,  0)  = pure red   = 11111111 00000000 00000000
          (  0,  0,  0)  = black
          (255,255,255)  = white
```

A 1920×1080 photo = 1920 × 1080 × 3 bytes ≈ **6.2 MB** uncompressed. (JPEG/PNG compress this.)

### The big idea

```
   01000001
       |
       +--> interpreted as a NUMBER    -> 65
       +--> interpreted as TEXT        -> 'A'
       +--> interpreted as a PIXEL     -> a dark red shade
       +--> interpreted as an INSTRUCTION -> some CPU opcode
```

> **The bits carry no meaning. The meaning comes entirely from how the program chooses to interpret them.** That is exactly what a *data type* is — Java's `int`, `char`, `double` are instructions telling the JVM *how to read* a pattern of bits.

---

## 5. Signed numbers and why `int` overflows

### The problem
`10000001` — is that 129, or is it −1? The bits alone can't say. So we agree on a scheme.

### Two's complement
The **leftmost bit (MSB)** becomes the **sign bit**: `0` = positive, `1` = negative.

For an 8-bit signed byte:
```
 00000000 =    0
 01111111 =  127   <-- largest positive (only 7 bits left for magnitude)
 10000000 = -128   <-- most negative
 11111111 =   -1
```

Range for `n` signed bits: **−2^(n−1) … +2^(n−1) − 1**

### Java's integer types — now they make sense

| Type | Bits | Range |
|---|---|---|
| `byte` | 8 | −128 … 127 |
| `short` | 16 | −32,768 … 32,767 |
| `int` | **32** | **−2,147,483,648 … 2,147,483,647** |
| `long` | 64 | ±9.22 quintillion |

**`int` maxes out at 2,147,483,647 because that is 2^31 − 1** — 32 bits, one spent on the sign.

### Overflow — the odometer effect

```
  int x = 2147483647;   // 01111111 11111111 11111111 11111111
  x = x + 1;            // 10000000 00000000 00000000 00000000
  // x is now -2147483648
```

Adding 1 to all-1s carries into the sign bit and flips it negative. Like a car odometer rolling 99999 → 00000. **Java does not warn you.** It silently wraps.

---

## 6. Real-world usage

- **YouTube, 2014** — the view counter was a signed 32-bit `int`. *Gangnam Style* passed 2,147,483,647 views and the counter broke. Google migrated it to 64-bit.
- **Year 2038 problem** — Unix time is seconds since 1970 in a signed 32-bit int. It overflows on 19 Jan 2038 and jumps to 1901. Systems worldwide are still being migrated.
- **Ariane 5 rocket, 1996** — a 64-bit float converted into a 16-bit int overflowed. $370 million destroyed 39 seconds after launch.
- **IP addresses** — `192.168.1.1` is four bytes: `11000000 10101000 00000001 00000001`. Each part is 0–255 because each is one byte.
- **Linux permissions** — `chmod 755` is binary flags: `111 101 101` = rwx r-x r-x.
- **Feature flags / bitmasks** — one `int` can store 32 on/off settings. Used constantly in real backends.

**Backend takeaway:** choosing `int` vs `long` for a database ID is a real design decision. An `int` primary key caps your table at ~2.1 billion rows. Plenty of production systems have hit that wall at 3am.

---

## 7. Interview perspective

**Standard**
1. Why do computers use binary? → Transistors have two reliable states; large voltage gaps resist noise.
2. Difference between a bit and a byte? → 1 binary digit vs 8 bits.
3. How many values fit in `n` bits? → 2^n.
4. Why is 1 KB = 1024 bytes? → 2^10.
5. Why is `Integer.MAX_VALUE` 2,147,483,647? → 32-bit signed, 2^31 − 1.
6. Convert 25 to binary. → 11001.

**Tricky follow-ups**
- *"What is `Integer.MAX_VALUE + 1` in Java?"* → `Integer.MIN_VALUE` (−2,147,483,648). Silent overflow, no exception.
- *"Why is a Java `char` 2 bytes when C's is 1?"* → Java uses UTF-16 to support Unicode; C's `char` is ASCII-era 1 byte.
- *"Why is `byte` signed in Java when bytes are usually 0–255?"* → Java deliberately has no unsigned primitives (except `char`) for language simplicity. Common source of bugs when reading files/network data.
- *"How would you detect overflow safely?"* → `Math.addExact()` throws `ArithmeticException`, or use `long`.

**Misconceptions**
- ❌ "Binary is used because it's mathematically better." → It's used because it's *electrically reliable*.
- ❌ "1 KB = 1000 bytes." → 1024 in computing contexts.
- ❌ "The character `'5'` equals the number 5." → `'5'` is ASCII 53.

---

## 8. Best practices

1. **Pick the type that fits the data's real range** — don't default everything to `int`, and don't default everything to `long` either.
2. **For money, never use `float`/`double`.** (Why comes in Phase 1 — floating point can't represent 0.1 exactly.) Use `BigDecimal`.
3. **Assume any counter that can grow unbounded will overflow an `int`.** IDs, view counts, timestamps → `long`.
4. **Know your ranges cold.** `int` ≈ ±2.1 billion. This number should be instant recall.

---

## 9. Summary card

- Binary exists because transistors have 2 reliable states; big voltage gaps resist noise.
- Place values are powers of the base. Binary: 128 64 32 16 8 4 2 1.
- `n` bits → `2^n` values. Byte = 8 bits = 256 values.
- 1 KB = 1024 bytes = 2^10.
- Text → ASCII/Unicode. Images → RGB bytes. Everything → bytes.
- **Bits have no inherent meaning; the data type decides how to read them.**
- Two's complement: MSB is the sign bit. Signed `n` bits → −2^(n−1) … 2^(n−1) − 1.
- `int` = 32 bits → max 2,147,483,647. Overflow wraps silently to negative.

---

## 10. Homework

1. Convert to binary by hand: **7**, **20**, **64**, **100**.
2. Convert to decimal: **101**, **11110**, **10000000**.
3. How many bits do you need to represent the numbers 0–1000? Show your reasoning.
4. A `short` is 16 bits. What is its maximum positive value? Derive it, don't look it up.
5. Explain in one sentence why `Integer.MAX_VALUE + 1` is negative.
6. *(Carried over from Day 001)* Algorithm for Instagram login incl. wrong password; algorithm for largest of three numbers.

## Next session preview

**Phase 0 · Module 3 — Compilers, Interpreters, and the JVM.**
The full journey of `Hello.java` → `javac` → `Hello.class` → JVM → CPU. What class loading, bytecode verification and JIT actually do. This is the last stop before we write real Java.
