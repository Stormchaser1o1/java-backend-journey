# Day 005 — How the Internet Works: Client, Server, Request, Response

**Phase 0 · Module 5 · 2026-08-07**

> Prerequisite: [Day 004 — Operating Systems](day-004-operating-systems.md)

---

## 1. Motivation

Everything so far has lived inside *one* machine: one CPU, one OS, one process. But the entire second half of your roadmap — Spring Boot, REST APIs, backend engineering — is about programs that run on a computer far away and talk to programs on someone else's computer, over a network neither of them controls.

Before you can build a "backend," you need to know, mechanically, what that word even means. Today answers: **when you type a URL and a page appears, what actually happens, step by step?**

---

## 2. The problem

Two computers, possibly on opposite sides of the planet, running completely different hardware and operating systems, need to:
- Find each other, given only a name like `google.com`
- Agree on a common "language" to exchange data reliably, even though the physical path between them is a patchwork of cables, routers, and wireless links owned by many different companies
- Have one side ask for something and the other side answer it, in a predictable, structured way

The internet is the layered set of agreements (**protocols**) that solve exactly this.

---

## 3. The concept

### Client and server — the fundamental relationship

- **Client** = the one who *asks*. Your browser, your phone's app.
- **Server** = the one who *answers*. A program running on a machine somewhere, waiting for questions, ready to respond.

```
   CLIENT                                    SERVER
  (your browser)                     (a computer somewhere else,
                                       running 24/7, waiting)

      |------------ REQUEST -------------------->|
      |         "give me the homepage"            |
      |                                            |
      |<----------- RESPONSE ---------------------|
      |         "here's the HTML"                  |
```

This is the **client-server model**, and it is the single most important shape in all of backend engineering. Everything from Phase 6 onward — Spring Boot, REST APIs — is you writing the **server** side of this picture. Right now you use apps as a client. Soon you'll build the thing on the other end.

### Analogy: ordering food by phone

You (**client**) call a restaurant (**server**). You need:
1. Their **phone number** (an address to reach them)
2. A shared **language** you both speak, so "I'd like a pizza" is understood the same way by both sides
3. A predictable **structure**: you ask, they take the order, they confirm, then they deliver

Swap in: phone number → **IP address**, shared language → **protocol**, predictable exchange → **request/response**. That's the whole shape of the internet.

---

## 4. Internal working — the full journey of typing a URL

### Step 1 — DNS: turning a name into an address

Computers find each other using numbers called **IP addresses** (e.g. `142.250.183.14`), not names. You never type that — you type `google.com`. Something has to translate.

That something is **DNS (Domain Name System)** — think of it as the internet's phone book.

```
  You type: google.com
       |
       v
  +------------------+
  |   DNS lookup      |   "what's the IP address for google.com?"
  +------------------+
       |
       v
  142.250.183.14
       |
       v
  Your browser now knows WHERE to send the request
```

Analogy: you know your friend's name, but to actually call them, you need their phone number. DNS is the contact list that converts "google.com" into the actual number to dial.

### Step 2 — TCP/IP: the reliable delivery mechanism

The internet is a chain of cables and routers, none of which are guaranteed to be perfectly reliable. Data doesn't teleport — it gets broken into small chunks called **packets**, and each packet might take a *different physical path* to the destination.

```
   Your message: "GET the homepage"
        |
        v
   broken into PACKETS
   [pkt 1] [pkt 2] [pkt 3]
        |
   each takes a possibly different route through the network
        |
        v
   reassembled, in the correct order, at the destination
```

**TCP (Transmission Control Protocol)** is the agreement that makes this reliable: it numbers each packet, confirms every one arrived, and re-requests any that got lost or arrived corrupted — so by the time your browser sees the data, it's complete and in order, even though the underlying network made no such guarantee on its own.

**IP (Internet Protocol)** is the addressing and routing layer — it's what actually gets a packet from your machine's address to the destination's address, hop by hop through routers, each one forwarding it a little closer.

Together: **TCP/IP** — reliable delivery (TCP) over an addressed, routed network (IP). You'll hear "TCP/IP" constantly; now you know it's actually two cooperating jobs, not one.

### Step 3 — HTTP: the actual "language" of the web

Once your browser can *reach* the server (thanks to DNS + TCP/IP), it needs a shared vocabulary for "what am I asking for, and how should you answer?" That's **HTTP (HyperText Transfer Protocol)**.

An HTTP request has a predictable shape:

```
  GET /index.html HTTP/1.1
  Host: google.com
  User-Agent: Chrome/...
  (blank line)
  (body — often empty for a simple page load)
```

- **Method** — what kind of action: `GET` (fetch something), `POST` (send/create something), `PUT`, `DELETE`, etc. You'll live in these daily from Phase 7 onward.
- **Path** — which specific resource: `/index.html`, `/users/42`
- **Headers** — metadata about the request: what browser, what content type, login tokens, etc.
- **Body** — the actual data being sent (a login form, a JSON payload) — often empty for a simple page fetch.

And the server's HTTP response has a matching predictable shape:

```
  HTTP/1.1 200 OK
  Content-Type: text/html
  (blank line)
  <html>...the actual page...</html>
```

- **Status code** — a 3-digit number telling you what happened: `200` (OK, success), `404` (Not Found), `500` (server crashed), `301` (redirect). You will write code that returns these deliberately, starting in Phase 7.
- **Headers** — metadata about the response.
- **Body** — the actual content: HTML, JSON, an image, whatever was asked for.

### Putting all three layers together — the full dry run

```
 You type "google.com" in the browser and press Enter

 1. DNS LOOKUP
    Browser asks DNS: "IP address for google.com?"
    DNS replies: 142.250.183.14

 2. TCP CONNECTION
    Browser and server perform a "handshake" (a quick back-and-forth
    to agree they're both ready) over TCP, using that IP address

 3. HTTP REQUEST sent (broken into packets by TCP, routed via IP)
    GET / HTTP/1.1
    Host: google.com

 4. Packets travel across possibly many different physical routes,
    get reassembled correctly on arrival, thanks to TCP

 5. THE SERVER (a program, running on a machine somewhere,
    conceptually just like your `java Hello` process, but one
    that never exits — it sits in a loop, waiting for requests)
    receives the request, processes it, builds an HTTP response

 6. HTTP RESPONSE sent back
    HTTP/1.1 200 OK
    Content-Type: text/html
    <html>... the Google homepage ...</html>

 7. Browser receives the HTML, parses it, renders it on your screen
```

Every single one of those steps happens in a fraction of a second, and it happens again for every image, script, and stylesheet the page needs — often dozens of separate request/response cycles for one page load.

---

## 5. Where your future Java code fits into this picture

```
   CLIENT (browser / mobile app)
        |
        |  HTTP request
        v
   +--------------------------------------+
   |     YOUR SPRING BOOT APPLICATION      |   <- this is what you're
   |                                       |      training to build
   |   - receives the HTTP request         |
   |   - runs Java code to handle it       |
   |     (maybe reads/writes a database)   |
   |   - builds an HTTP response           |
   +--------------------------------------+
        |
        |  HTTP response
        v
   CLIENT receives it, displays the result
```

**This is the concrete meaning of "backend."** A backend is a program — conceptually no different from `Hello.class` running as a process, except it stays running indefinitely, listens on a network port instead of just printing to a console, and its "output" is an HTTP response instead of a `println`. Everything you learned about processes (Day 004) applies directly: your future Spring Boot app *is* an OS process, with its own PID and memory, that the OS schedules CPU time for, just like any other program — it just happens to also be listening for network connections.

---

## 6. Real-world usage

- **Every REST API you'll build from Phase 7 onward** is exactly the request/response shape from today — `GET /users/42` returning a `200 OK` with JSON, or a `404` if that user doesn't exist.
- **Status codes are a real, constantly-used vocabulary** — `200` success, `201` created, `400` bad request (client's fault), `401`/`403` auth problems, `404` not found, `500` server error (your fault). You'll be asked to explain the difference between `400` and `500` in almost every backend interview.
- **"The website is down" almost always means one specific layer failed** — DNS not resolving, the server process crashed (no process listening to answer), or the server is up but returning `500` errors. Being able to say *which* layer failed is a genuine, valued debugging skill.
- **HTTPS** is HTTP plus an encryption layer (TLS) wrapped around the same request/response shape — the "language" doesn't change, the conversation just gets locked in an envelope so nobody snooping on the network in between can read it.

---

## 7. Interview perspective

**Standard questions**
1. What is the difference between a client and a server?
2. What does DNS do?
3. What's the difference between TCP and IP?
4. What is an HTTP request made of? An HTTP response?
5. Name a few HTTP status codes and what they mean.

**Tricky follow-ups**
- *"What's the difference between `GET` and `POST`?"* → `GET` retrieves data and shouldn't change anything on the server (safe to repeat, cacheable, no body typically); `POST` sends data to create/change something (not safe to blindly repeat — e.g., resubmitting a payment form). You'll formalize this fully in Phase 7.
- *"Why do we need both TCP and IP — why isn't one enough?"* → IP only handles addressing/routing — it can lose or reorder packets with no guarantee. TCP adds the reliability layer on top: ordering, retransmission, confirmation. Different jobs, deliberately separated.
- *"If DNS is just a lookup, what happens if it's slow or down?"* → The browser can't resolve the domain to an IP at all, so it never even reaches the TCP step — this is why DNS outages take down access to sites that are themselves running perfectly fine.
- *"Where does your Spring Boot app 'live' in this picture?"* → It's the server: a long-running OS process that listens on a network port, receives HTTP requests, and returns HTTP responses — this is the exact question this module was building toward.

**Misconceptions**
- ❌ "The internet sends my whole message in one piece." → It's broken into packets that may take different physical paths and get reassembled at the destination.
- ❌ "HTTP and TCP/IP are the same thing." → HTTP is the *content/vocabulary* layer (what you're asking for); TCP/IP is the *delivery* layer underneath it (how bytes actually get there reliably).
- ❌ "A 404 means the whole website is broken." → It means that *specific resource/path* wasn't found; the server itself is up and correctly answering.

---

## 8. Best practices

1. **When debugging "it doesn't work" for anything web-related, mentally walk the layers**: DNS resolving? Can you reach the server at all? Did you get a response? What status code? This module is literally your debugging checklist for the rest of the roadmap.
2. **Know your status codes by category, not by memorizing every number**: 2xx = success, 3xx = redirect, 4xx = client's mistake, 5xx = server's mistake. That grouping alone answers most interview questions.
3. **Get comfortable with the words "request" and "response" as a pair** — you will design APIs (Phase 7) by deciding exactly what shape each request and response takes. This is the core skill of REST API design.

---

## 9. Summary card

- **Client** asks, **server** answers — the client-server model underlies everything backend.
- **DNS** translates a domain name (`google.com`) into an **IP address** — the internet's phone book.
- **IP** routes data (as packets) across the network; **TCP** makes that delivery reliable — ordered, confirmed, retransmitted if lost. Together: **TCP/IP**.
- **HTTP** is the shared vocabulary on top: a **request** (method + path + headers + body) gets a **response** (status code + headers + body).
- Methods: `GET` fetch, `POST` create/send, etc. Status codes: `2xx` success, `3xx` redirect, `4xx` client error, `5xx` server error.
- A **backend** (what you're training to build) is just a long-running OS process — like any process from Day 004 — that listens on a network port and answers HTTP requests instead of printing to a console.

---

## Next session preview

**Phase 0 · Module 6 — Algorithms & Pseudocode: Thinking Before Coding.**

The final module of Phase 0. How to break a problem into precise, ordered steps *before* touching syntax — the direct bridge into Phase 1, where you'll finally translate that thinking into real Java code.
