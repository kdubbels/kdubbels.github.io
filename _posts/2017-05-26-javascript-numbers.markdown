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

1. Arrow Functions in JavaScript

Arrow functions are one of the most exciting new innovations in ECMAScript 6. Arrow functions dramatically simplify functions in JavaScript. 

Let's compare the syntax of arrow functions with a more standard function in JavaScript*:

{% highlight javascript %}

let reflect = value => value;

// which is equivalent to:

let reflect = function(value) {
    return value;
};

{% endhighlight %}

As you can see, the arrow function notation is much more succinct than a standard function expression. But the differences go beyond syntactic sugar - fat arrow functions have several crucial behavioral differences.

Arrow functions, crucially, largely behave in a way that avoids certain idiosyncrasies specific to JavaScript. One common source of confusion in JavaScript, the dynamic scope of the `this` keyword, is avoid entirely - there is no `this` binding on arrow functions. Likewise, there are no `arguments` or `super` bindings on arrow functions.

Likewise, an arrow function cannot be called with the `new` keyword. This means arrow functions cannot be used as constructors. (By convention this means that arrow functions should always been given names that begin with lowercase letters.) This also means that arrow functions have no prototype - since you can't use the `new` reserved word, the concept of a prototype doesn't apply.

The original JavaScript `function` has several quirks that result from JavaScript's multi-paradigm nature - effectively, JavaScript originated as Scheme for the web browser, but with objects and Java-influenced syntax.

2. Numbers

Alright, let's make our first attempt at creating numbers by approximating the Neumann Ordinals.

{% highlight javascript %}

let zero = 0;

let increment = n => n + 1;

{% endhighlight %}

So let's say you want to build up the number 3? Increment zero 3 times like so: 

{% highlight javascript %}

increment(increment(increment(zero))); // 3

{% endhighlight %}

And now... a recurse function!

{% highlight javascript %}
function recurse(f, g, values) {
	var other_values = values;
	var last_value = values;

	if (last_value == 0) {
		/*
			If last input value is zero, recurse()
			calls `f`, passing the rest of the values
			as arguments.
		*/

		f(other_values);
	} else {
		/*
			If last input isn't zero, recurse() decrements it,
			calls itself with the updated input values, and then calls
			the method named by g with those same values and the
			result of the recursive call.
		*/

		var easier_last_value = last_value - 1;
		var easier_values = other_values + easier_last_value;

		var easier_result = recurse(f, g, easier_values);
		g(easier_values, easier_result);
	}
}
{% endhighlight %}

// Alright, we're now ready to create our first numbers. We'll be following a procedure that creates "Church Numerals". The concept is similar to Neumann's construction of ordinals - basically, numbers are created from nothing. In contrast with Neumann ordinals, however, Church Numerals are build up using functions.


*This example is from "Understanding ECMAScript 6" by Nicholas Zakas