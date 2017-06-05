---
layout: post
title: "Lambda Calculus Part 1: Curry"
date:   2017-05-20 12:31:00
categories: jekyll update
---

The lambda calculus is a _calculus_ because describes how to manipulate expressions that describe computations; this makes it distinct from other calculi with which you may be more familiar (the differential calculus describes how to manipulate expressions that represent functions; propositional calculus describes how to manipulate expressions that represent propositions).

The lambda calculus itself essentially a very simple expression-based programming language that consists of exactly three types of expressions:

1. An identifier reference: a _name_ to identify an abstraction point.
2. A function definition, which introduces an abstraction.
3. A function application.

We'll focus on function definition first, and one particular aspect of function definitions in lambda calculus that can be confusing at first.

A function in lambda calculus is notated like this: _λparam.body_. This expression defines a function with a single parameter.

This can be a little confusing at first - how useful could a language be if all your functions can only accept a single parameter? The answer is simple: we can create functions that _look and behave as if they take multiple parameters_. Taking a two parameter function and representing it with 2 one paramter functions is called _currying_.

Using lambda notation, we can write a curried addition function thus:

{% highlight lisp %}
λx(λy(x + y))
{% endhighlight %}

Simply put, the addition function is a function on _one_ variable: `x`. This function, when given `x` returns the function that adds `x` to `y`.

Now, let's translate that into ES6:

{% highlight javascript %}
let add = x => y => x + y;
add(3)(4); // returns 7
{% endhighlight %}

For comparison, here is the equivalent non-curried `add()`:
{% highlight javascript %}
let add = function(x, y) {
	x+y;
};
add(3,4); // returns 7
{% endhighlight %}

Pretty cool!

Currying is a built-in feature of functional languages; in a language such as Haskell, _all_ functions are curried.

Currying also highlights another important aspect of the lambda calculus: _syntactic closure_. In the context of programming languages - and in JavaScript - this is also known as _lexical scope_ or _lexical binding_. This will be the subject of part 2.