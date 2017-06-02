---
layout: post
title: "Building Numbers in JavaScript"
date:   2017-05-26 12:31:00
categories: jekyll update
---

Let's say we want to build up the natural numbers from scratch, using nothing but functions. Let's also pretend that we know JavaScript.

0. Sets

Firstly, what is a number? We'll approach the question through the arguments of John Von Neumann, one of the greatest mathemeticians of all time and a foundational giant in computer science.

At the heart of Von Neumann's construction of numbers is the concept of _nothing_ itself. And, likewise, is the concept of _sets_ and the related concept of _membership_. A set is a straightforward concept, having more or less the same meaning in mathematics as it does in everyday language. Simply put, a set is a collection of _distinct_ objects taken as a distinct object itself. Defined thus, this means there are no _repeated_ objects in a set. By convention, sets are denoted thus { 1, 2, 3 }, where the set contains three distinct _elements_ or _members_: the numbers 1, 2, and 3.

Sets can also be written using _set builder notation_. This looks like, for instance, { x : x > 0 }, read as "the set of all x, such that x is greater than 0". (Incidentally, this set is identical to the natural numbers.)

There are a handful of other important properties of sets that are significant. Crucially, the _order_ of a set doesn't matter. Let's say you have a standard JavaScript array thus:

{% highlight javascript %}

const anArray = [0, 2, 1];

{% endhighlight %}

One significant property of an array is the concept of _ordering_. Sets have no such property. So, whereas an array `[0, 2, 1]` isn't equal to an array `[0, 1, 2]`, the set {0, 1, 2} _is equal_ to the set {0, 2, 1}.

As mentioned above, sets also do not have repeated elements. Put another way, the set {0, 1, 1, 0} is the same as the set {0, 1}.

Lastly, a set need not be a set of numbers. For instance, non-numeric symbols may be members of a {♠, ♦, ♥, ♣}. Additionally, a set may contain non-symbols as well. Take the variable x to mean "the pear sitting on my desk right now". Thus, the set of all pears sitting on my desk right now may be written as {x}. Crucially, a set may also be empty - this can written in one of two ways: {} or Ø. This is referred to as the "empty set" or, simply "null".