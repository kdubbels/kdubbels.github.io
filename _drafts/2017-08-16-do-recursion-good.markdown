---
layout: post
title: "How To Do Recursion Good"
date:   2017-08-16 12:31:00
categories: recursion
---

In his fine book _Get Programming with Haskell_, Will Kurt describes a five step process for writing a recursive procedure.

1. Identify the end goal(s).
2. Determine what happens when a goal is reached.
3. List all alternate possibilities.
4. Determine your “rinse and repeat” process.
5. Ensure that each alternative moves you toward the goal.

What's interesting about Kurt's process is that it appears iterative, rather than recursive. A joke in programming goes something like this:

The definition of recursion: see recursion.

This doesn't define recursion, although it is an instance of recursion. However, the procedure for defining a _recursive_ procedure, as defined above by Kurt, is _iterative_ - even though it only goes through one iteration.

But what about in "real life"? In general, I find my own _practical_ procedure for creating recursive procedures is... recursive. Namely, I keep trying stuff until the damn thing works.