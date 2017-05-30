---
layout: post
title: "Lambda Calculus Part 3: Evaluation"
date:   2017-05-26 12:31:00
categories: jekyll update
---

So you've made it far enough in lambda calculus that you now understand the three types of expressions. The next obvious step is how to _actually do stuff with the expressions_. This is where the two rules of evaluation come in. (There is a third rule, but it is of less importance in a quick intro like this one.)

The first rule is called α conversion. An α conversion replaces one name with another to ensure you don't have naming collisions. This may seem relatively trivial - since the meaning of an expression isn't changed - but it will become very important once we introduce recursion.

The second rule is called β reduction. A β reduction is how you apply a function in lambda calculus: the replacement of a bound variable with an argument in a function body.

As Mark Chu-Carrol describes it:
"If you have a function application, you can apply it by replacing the function with the body of the lambda and then taking the argument expression and replacing all uses of the parameter in the lambda with the argument expression." (Good Math, p. 225)


This may seem like quite a mouthful, but β reduction has a deep significance: with it, the lambda calculus can perform any computation that can by carried out by a machine. 

Let's look at an example of β reduction that harks back to part 1:

```
(λx.λy.x+y) 3 4
```

The first step in the β reduction is to apply the first parameter, which reduces to:

```
(λy.3+y) 4
```

Which in turn reduces to:

```
3+4
```
Which is, of course:

```
7
```

:tada: :tada: :tada:

A name clash arises when a β reduction places an expression with a free variable in the scope of a bound variable with the same name as the free variable. So, α conversion is the process which removes the name clash.

This all may seem a bit abstract for now, so we'll look at a few examples of lambda expressions in the next part. In the final parts, we'll show how lambda calculus is _Turing complete_ by constructing numbers and flow of control.