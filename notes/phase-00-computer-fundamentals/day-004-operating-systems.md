# Day 004 — What is an Operating System? Processes, Memory, and Files

**Phase 0 · Module 4 · 2026-08-07**

> Prerequisite: [Day 003 — Compilers, Interpreters, and the JVM](day-003-compilers-interpreters-jvm.md)

---

## 1. Motivation

You now know: source code → bytecode → JVM → CPU. But when you type `java Hello` and hit enter, *something* has to actually find the JVM program on disk, load it into RAM, give it a slice of CPU time, hand it access to your keyboard/screen, and make sure it doesn't stomp on the fifteen other programs also running right now (your browser, Discord, antivirus...).

That "something" is the **Operating System (OS)** — Windows, in your case. Today's topic is the layer that sits between every program you'll ever write and the raw hardware.

---

## 2. The problem

Imagine there was no OS — just your Java program talking directly to hardware. You'd need to personally write code to:

- Find free RAM and make sure no other running program is already using it
- Talk directly to the disk controller to read a file, sector by sector
- Take turns with every other running program for CPU time, manually
- Handle keyboard/mouse/network hardware signals yourself

Every single application developer, reinventing all of that, for every program. Chaos, and enormous duplicated effort.

**The OS exists to do all of that once, centrally, and expose a clean, safe set of services that every program can just call.**

---

## 3. The concept

### Analogy: the OS is the building manager, not the resident

Picture an office building with hundreds of tenants (your running programs). The **building manager** (OS):

- Assigns each tenant a room (memory)
- Schedules elevator access so people don't collide (CPU scheduling)
- Controls the one shared front door (hardware: keyboard, disk, network)
- Keeps a tenant from wandering into someone else's office and reading their files (memory protection)

No tenant talks to the electrical wiring directly. They ask the building manager, who has the actual access.

### A "program" vs a "process" — a distinction interviewers love

- **Program** = the file sitting on disk, doing nothing. `Hello.class` sitting in a folder.
- **Process** = that program, *loaded into RAM and actually running*, with its own private slice of memory, its own OS-tracked identity (a Process ID / PID), and its own resources.

```
   Hello.class  (on disk, inert)
        |
        |  you run:  java Hello
        v
   OS creates a PROCESS
   +--------------------------------+
   |  PID: 4821                     |
   |  private memory space          |
   |  open file handles             |
   |  CPU time allocated by the OS  |
   +--------------------------------+
```

Run `java Hello` three times simultaneously (in three terminal windows) and you get **three separate processes**, each with its own PID, each with its own private memory — even though they all started from the exact same `Hello.class` file. Changing a variable in one has zero effect on the others. This is why one crashing Chrome tab (in Chrome's multi-process design) doesn't take down your whole browser.

### Threads — a process can have more than one "worker" inside it

A process is like the whole office; a **thread** is one worker inside that office, actively doing something. A process starts with exactly one thread (the `main` thread in Java) but can spawn more.

```
   PROCESS (java Hello)
   +----------------------------------------+
   |  shared memory (all threads can see it)|
   |                                        |
   |   Thread 1 (main)  Thread 2   Thread 3 |
   |      |                |          |     |
   |   executing        executing  executing|
   |   its own line     its own    its own  |
   |   right now         line       line    |
   +----------------------------------------+
```

Threads inside the same process **share memory** — that's powerful (they can cooperate on the same data instantly) and dangerous (two threads editing the same data at once causes bugs called *race conditions* — you'll meet these properly in Phase 3, they're a real, common interview topic).

---

## 4. Internal working

### CPU scheduling — how the OS fakes "everything running at once"

Your CPU likely has 4–16 cores. You have far more than 16 programs running (check Task Manager — you'll see 200+ processes). How?

**The OS gives each process a tiny slice of CPU time (a few milliseconds), then switches to the next one.** This is called a **context switch**. It happens so fast — hundreds of times per second — that it *looks* simultaneous to a human, even though at any single instant, each CPU core is running exactly one thread.

```
  Time -->
  Core 1:  [Chrome 5ms][Spotify 5ms][java Hello 5ms][Discord 5ms][Chrome 5ms]...
```

The **scheduler** (part of the OS) decides the order and duration. This is also *why* opening too many programs makes your computer feel sluggish even with a fast CPU — everyone's slice gets thinner.

### Memory — how a process gets its RAM, structured

When the OS creates a process, it hands it a private address space, conceptually divided into regions:

```
   HIGH ADDRESSES
   +----------------------+
   |        STACK         |  function calls, local variables
   |     (grows down)     |  -- you'll go deep on this in Phase 1/3
   |          |            |
   |          v            |
   |                       |
   |          ^            |
   |          |            |
   |     (grows up)        |
   |         HEAP          |  objects you create with `new`
   +----------------------+
   |    Static/Global      |  class-level data, loaded once
   +----------------------+
   |      Code (Text)      |  the actual compiled instructions
   +----------------------+
   LOW ADDRESSES
```

This is just a preview — you will study the JVM's own version of this (heap vs stack for Java objects specifically) in depth in Phase 3. For today, the one fact to hold onto: **each process believes it owns the entire address space to itself.** The OS is quietly translating each process's private addresses to real physical RAM locations behind the scenes (a mechanism called *virtual memory*), which is exactly why one process can never accidentally read another process's memory — they're not even looking at the same real addresses.

### Files — what a "file" actually is to the OS

To you, a file is an icon with a name. To the OS, a file is:

- A sequence of raw bytes sitting on the disk
- Tracked by metadata: name, size, permissions, and *where on disk those bytes actually live*
- Organized into a **file system** (NTFS on your Windows drive) — the OS's own bookkeeping structure for "which bytes belong to which file, and where."

When your Java program does `new File("data.txt")` or reads/writes a file (Phase 1/8 territory), it isn't touching the disk directly — it asks the OS: *"open this file for me,"* and the OS hands back a **file handle** (a reference/ticket), then mediates every read and write through that handle. This is the same "ask the building manager, don't touch the wiring" principle as before.

---

## 5. Putting it together — what actually happens when you type `java Hello`

```
1. You type "java Hello" and press Enter
2. The Shell (PowerShell) asks the OS to create a new PROCESS
3. OS finds java.exe on disk (via your PATH), loads it into a fresh
   private memory space, assigns it a PID, and schedules CPU time for it
4. That process (the JVM) asks the OS to open and read Hello.class
   (OS hands back a file handle, mediates the actual disk read)
5. JVM verifies + starts interpreting the bytecode (Day 003)
6. System.out.println asks the OS to write bytes to the console
   (again — not directly; through an OS-mediated output stream)
7. main() finishes -> JVM asks the OS to terminate the process
8. OS reclaims all the memory that process was using, frees the PID
```

Every single arrow in that list that touches "the outside world" — disk, screen, keyboard, network — goes through the OS. Your Java code never touches hardware directly. Ever. This is deliberate and is a core reason modern computers are stable: one misbehaving program can't (normally) directly corrupt another's memory or crash the whole machine.

---

## 6. Real-world usage

- **Task Manager / `Activity Monitor`** is literally a live view of the OS's process table — PID, memory used, CPU % per process. Now you know what each column actually represents.
- **"Out of memory" crashes** in a Java backend happen when the JVM's own memory region (allocated to it by the OS) fills up — the OS itself might have plenty of free RAM elsewhere, but *your process's* slice is full. This is a real, common production incident category, and Phase 3 covers exactly how to size and monitor it.
- **Docker containers** (which you'll use from Phase 8 onward) are, at their core, regular OS processes with extra isolation — restricted views of memory, files, and network, enforced by the same OS mechanisms you learned today. A "container" is not a mini virtual computer; it's a process with a fence around it.
- **A web server handling many users at once** (your future Spring Boot apps) relies directly on threads — one thread (often) per incoming request, all sharing the same process's memory, scheduled by the OS across your CPU cores. Everything today is the literal foundation of "how does my backend handle 1000 users clicking at the same time."

---

## 7. Interview perspective

**Standard questions**
1. What is the difference between a process and a thread?
2. What is a PID?
3. What is context switching?
4. Why can't one process normally read another process's memory?
5. What is virtual memory, in one sentence?

**Tricky follow-ups**
- *"If threads share memory and processes don't, why would you ever use multiple processes instead of multiple threads?"* → Isolation and safety — a crash in one process can't corrupt another's memory. Multi-process is safer but heavier (no shared memory = more overhead to communicate); multi-threaded is lighter and faster to coordinate, but a bug in one thread can corrupt data another thread relies on.
- *"You have a 4-core CPU. Can you truly run 8 threads at literally the same instant?"* → Only 4 can execute at the *exact same physical instant* (one per core). The other 4 are being rapidly context-switched in and out — it *appears* simultaneous but isn't, at the hardware level, unless you have 8+ cores.
- *"What happens if a process tries to access memory outside what the OS gave it?"* → The OS's memory protection stops it — on Windows/Java this typically surfaces as a crash/exception (you'll meet `OutOfMemoryError` and segmentation-fault-style failures later); the OS refuses the access rather than letting it corrupt another process.

**Misconceptions**
- ❌ "A program and a process are the same thing." → A program is an inert file; a process is that program actually loaded and running, with its own memory and PID.
- ❌ "My 8-core CPU runs my 200 open processes all at literally the same instant." → It rapidly context-switches; true simultaneity is capped at the core count.
- ❌ "My Java code reads files directly from the disk." → It asks the OS, which mediates every single access.

---

## 8. Best practices

1. **When your program seems "stuck," think in terms of processes/threads** — is it waiting on the OS for a resource (disk, network), or is it in an infinite loop burning CPU? Task Manager's CPU% column tells you which.
2. **Don't assume "more threads = automatically faster."** Beyond your core count, you gain concurrency (handling more *at once*, useful for I/O-bound waiting) but not necessarily true parallelism (actual simultaneous computation) — a nuance we'll formalize properly in Phase 3.
3. **Remember the mediation principle**: your code never touches hardware directly; it always asks the OS. This is *why* file I/O and network calls in your future Spring Boot code are comparatively slow and need careful handling (Phase 8) — every single one is a request to another party, not a direct local operation.

---

## 9. Summary card

- The OS is the mediator between every program and the raw hardware — memory, CPU, disk, network — so programs never touch hardware directly.
- **Program** = inert file on disk. **Process** = that program loaded into RAM and running, with its own PID and private memory.
- **Thread** = a worker inside a process; threads in the same process share memory (powerful, but risks race conditions).
- **Context switching**: the OS rapidly swaps which process/thread each CPU core is running, creating the illusion of many things happening "at once."
- **Virtual memory**: each process believes it owns the full address space; the OS secretly maps that to real physical RAM, which is *why* processes can't read each other's memory.
- **Files**: the OS owns the disk; your program gets a file handle and every read/write is mediated by the OS.
- Docker containers = OS processes with extra isolation, not mini virtual machines.

---

## Next session preview

**Phase 0 · Module 5 — How the Internet Works: Client, Server, Request, Response.**

What actually happens between you typing a URL and a page appearing — DNS, IP addresses, TCP/IP, HTTP request/response — the direct groundwork for understanding what a "backend" (the thing you're training to build) actually *is*.
