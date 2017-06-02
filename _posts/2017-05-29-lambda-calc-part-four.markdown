---
layout: post
title: "Lambda Calculus Part 4: Evaluation Strategies"
date:   2017-05-26 12:31:00
categories: jekyll update
---

In the previous part of this series, we discussed beta reduction. We also hand-waved just _how_ beta reduction is carried out. That is to say, there is more than one way to reduce a lambda expression. The way that a beta reduction is actually carried out is called an _evaluation strategy_. We'll discuss two evaluation strategies here:

_Applicative Order_: In applicative order, take the innermost expressions that can be reduced, and evaluate them from right to left (_eager_).

_Normal Order_: In normal order, take the outermost expressions and evaluate them from left to right (_lazy_).

Applicative order is _eager_, while normal order is _lazy_: in applicative order, all paramaters are evaluated first. In normal order, which is _lazy_, parameters aren't evaluated until it is absolutely necessary. We'll discuss whether or not the two evaluation strategies produce different results after we've examined a few examples.

Let's look at applicative order in some depth first.

To evaluation an expression using applicative order, perform the following steps.

1. Evaluate all sub-expressions within the expression.

2. Apply the procedure that is the value of the leftmost sub-expression (the operator) to the arguments that are the values fo the other sub-expressions (the operands).

Let's look at an example (taken from Mark Chu-Carroll's terrific book, _Good Math_):

```
(λxyz.(x * x) + y) (3 + 2)(10 * 2)(24 / (2 * 3))
```

(This is a slightly different notation than in previous parts, but for our purposes here, `λxyz.` is the same as `λx.λy.λz.`)

We'll start with the _eager_ evaluation strategy. Since we want to evaluate the inmost expression first, we perform the multiplication `(2 * 3)`, which equals `6`.

We now have:

```
(λxyz.(x * x) + y) (3 + 2)(10 * 2)(24 / 6))
```

Having taken care of the inmost sub-expression, we now move right to left, giving us:

```
(λxyz.(x * x) + y) 5 20 4)
```

We can now evaluate our outermost λ:
```
(λxyz.(x * x) + 20) 5 4)
```

The final reductions should be obvious by now:
```
(λxyz.(5 * 5) + 20) 4)
(λxyz.(25 + 20) 4)
(λz.(45) 4)
45
```

Now, let's try lazy evaluation on the same expression:

```
(λxyz.(x * x) + y) (3 + 2)(10 * 2)(24 / (2 * 3))
```

Since we _start_ with outermost beta reduction, we immediately get:

```
(λz.((3 + 2) * (3 + 2) + (10 * 2) (24 / (2 * 3))
(λz.((5 * 5) + 20) (24 / (2 * 3))
(λz.(25 + 20) (24 / (2 * 3))
45
```

(The "steps" shown above are merely to make the math explicit - there is really only one beta reduction occuring above. The evaluation of the mathematical expressions are not steps of beta reduction per se.)

What is crucial to note about lazy evaluation is that one of the sub-expressions never gets evaluated. You may recall from part 2 the discussion of free vs. bound variables. In the expression above, `z` is bound (to `(24 / (2 * 3))`), but it is _never used_.

Let's look at our original example from the very beginning:

```
(λx(λy(x + y)) 3 4)
```

Using applicative order we get the following reduction steps:

```
(λx(λy(x + y)) 3 4)
3+4
7
```

And with normal order:

```
(λx(λy(x + y)) 3 4)
3+4
7
```


Now, how do the two evaluation strategies _really_ differ? Do they always produce the same results? I can't delay the big reveal any longer... we have been effectively conflating two distinct concepts: _evaluation_ strategy and _reduction_ strategy. It will take us too far afield to discuss the subtleties of the distinction here, but it is worth noting that although related, they are not identical. Indeed, the _chef-d'œuvre_ of functional programming, _The Structure and Interpretation of Computer Programs_ doesn't distinguish these two concepts. Briefy, an evaluation strategy determines when to evaluate the arguments of a function call and what kind of value to pass to this function, whereas a reduction strategy refers to the process by which a more complex expression is reduced to a simpler expression. Confused? Until relatively recently, so were computer scientists. Strictly speaking, the examples above map more closely to the distinction between eager evaluation and lazy evaluation. Indeed, in at least one important functional programming text book (Michaelson's _An Introduction to Functional Programming Through Lambda Calculus_), lazy evaluation is descibed as combining "the advantages of normal order and applicative order evaluation" (p. 199).

So, since we want to keep things relatively simple, we'll gloss over the arcana and simply offer a handful of intuitions about these strategies. One obvious advantage of lazy evaluation is that they can still perform useful computation even if evaluation of some of their arguments would produce errors. We can see this using one of the examples above, ie, `(λxyz.(x * x) + y) (3 + 2)(10 * 2)(1 / 0))`. Even though dividing by zero isn't allowed, it will never be evaluated in a program using lazy evaluation. That said, for reasons we won't explore here, lazy evaluation is relatively difficult to combine with one noteworthy feature of imperative languages, exception handling. 

Another advantage of lazy evalution is the ability to create infinite data structures; this is one of the most distinctive features of Haskell, which is perhaps the most prominent language to use lazy evaluation.

But enough of all these technicalities! Let's make some numbers.