---
layout: post
title: "Lambda Calculus Part 5: Numbers"
date:   2017-05-28 12:31:00
categories: jekyll update
---

Alright, let's build some numbers!

Building numbers with lambda calculus requires the use of _Church encoding_. Church encoding is a technique by which we can represent operators and data in lambda calculus. Church encoding includes Church numerals (ie, numbers), Church Booleans, and other mathematical operators.

From the beginning of this series, we've simply assumed that we had both numbers and mathematical operators that allow us to operate on those numbers. Let's look back at a variant of the lambda expression from the first part of this series:

{% highlight lisp %}
(λx(λy(x + y)) 3 4)
{% endhighlight %}

Recall that in the first part of this series, we defined lambda calculus as consisting of three parts:

1. An identifier reference: a _name_ to identify an abstraction point.
2. A function definition, which introduces an abstraction.
3. A function application.

Nowhere in there do we mention the ability to perform arithmetic. However, we have the ability to create both numbers - and mathematical operators - starting from these three constituent parts. Building up numbers from functions is less complex than you may imagine. We'll represent the first 5 natural numbers below:

{% highlight lisp %}
0 = λs.λz.z
1 = λs.λz.s z
2 = λs.λz.s (s z)
3 = λs.λz.s (s (s z))
4 = λs.λz.s (s (s (s z)))
5 = λs.λz.s (s (s (s (s z))))
{% endhighlight %}

The value of the numeral is equivalent to the number of times the function encapsulates its argument - put glibly, count the number of `s`'s in the body of the function, and that's the number it represents.

We build up the numbers in a similar way to Von Neumann ordinals; here, we get 0 by not applying a function at all. (Think of `s` as "successor" while `z` is "zero".)

Adding Church numerals is a big enough topic to warrant a post of its own. But we can preview the two basic steps here, assuming we want to carry out something simple, like `x + y`:

1. Create the Church numeral `y` using the technique above.
2. Take the result of 1 and apply `x` to it, using the same `s` and `z` from above.

The tricky part here is that by utilizing the same `s` and `z` functions to construct both `y` and `x`, we'll need to carry out an alpha conversion to avoid a naming collision. _Then_ we'll carry out a series of beta reductions. All this will be described in detail in the next post.