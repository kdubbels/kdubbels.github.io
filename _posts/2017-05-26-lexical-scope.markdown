---
layout: post
title: "Lambda Calculus Part 2: Lexical Scope"
date:   2017-05-26 12:31:00
categories: jekyll update
---

We saw an example of a curried function in part 1:
```
let add = x => y => x + y;
add(3)(4) // returns 7
```

Curried functions represent 1 two parameter function with 2 one parameter functions. 

Although it may seem obvious, it is important to recall that a variable must always be _declared_. To declare a variable is, by definition, to _bind_ it to some value. Let's say a variable references an identifier that isn't bound to any value.

```
let add = y => x + y;
add(3)
```

Without running this code, you should be able to readily predict what it will return (or, rather, that it won't return any value whatsoever). If you were to run this code in a REPL, you'd get `Uncaught ReferenceError: y is not defined`. Any identifier that isn't bound is called a "free variable"; in JavaScript, attempting to call a function with a free variable results in an `Uncaught ReferenceError`.

So, let's break down our add function to illustrate how closure works. After all, `add` really contains two functions; let's look at the inner function first. On its own, this inner function
`y => x + y;`
will obviously result in an error; x is a free variable. What happens when you surround that inner function with the outer function to get `let add = x => y => x + y;`? This is exactly where closure comes in. The `x` in the inner function will come from the invocation of the surrounding lambda. This is called "lexical scope" (it is distinct from dynamic scope; JavaScript uses both types of scopes in different parts of the language. Using fat arrow syntax, however, a function can _only_ utilize lexical scope.)

```
let add = x => y => x + y;
add(3)(4) // returns 7
```

Let's return to lambda calculus notation for a moment, and look at two more expressions to determine if they have any free variables.
```
λx.xyz
```
This expression contains _two_ free variables: `y` and `z`. Only `x` is a parameter in the enclosing λ expression. Let's try another:

```
λxy.xy
```

This should be intuitive by now: all variables are bound.

It is important to emphasize that a lambda expression is only valid if all variables are bound.

The next steps in the lambda calculus will be to look at two rules for evaluating lambda expressions: α conversion and β reduction. Understanding these evaluation rules will allow us to show the potential of the lambda calculus to build up and express very complex abstractions from extremely simple building blocks.