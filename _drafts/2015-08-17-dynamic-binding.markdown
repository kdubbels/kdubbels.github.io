---
layout: post
title: "Dynamic Binding"
date:   2017-08-17 12:31:00
categories: dynamic binding
---

## Implementing Dynamic Binding

There are a number of ways to implement dynamic binding, but the simplest is to begin with a global table of values. If you've ever used JavaScript, you're already familiar with some variant of the following:

{% highlight javascript %}

var globals = {};

{% endhighlight %}

Then, in order to carry out the bindings and look-ups, you could use an implementation like this:

{% highlight javascript %}

function makeBindFun(resolver) {
	return function(k, v) {
		var stack = globals[k] || [];
		globals[k] = resolver(stack, v);
		return globals;
	};
}

{% endhighlight %}

With your look-up table in place, you can add in procedures for actually creating bindings:

{% highlight javascript %}

var stackBinder = makeBindFun(function(stack, v) {
	stack.push(v);
	return stack;
});

var stackUnbinder = makeBindFun(function(stack) {
	stack.pop();
	return stack;
});

var dynamicLookup = function(k) {
	var slot = globals[k] || [];
	return _.last(slot); // uses Underscore's _.last method
}

{% endhighlight %}


{% highlight javascript %}

stackBinder('foo', 1);
stackBinder('bar', 2);

dynamicLookup('foo');

{% endhighlight %}

Play around with this a little - notice that the values assigned to the key in the `globals` object are pushed to an `array` that is here acting as a _stack_. This leads to some interesting - and probably _unexpected_ behavior.


## The Symbol Table
Now that we've seen the code, let's talk about the theory.

The `globals` object we created above is often called a _symbol table_ in computer science textbooks. Like a dictionary, it must support the insertion, lookup, and deletion of names. A symbol table can be viewed as a collection of names (similar to a dictionary), each of which has a stack fo declarations associated with it. The declaration at the top of the stack is the declaration currently in scope.

Now, where _dynamic_ scoping comes in - and differs from _static_ scoping, is _when_ the symbol table is managed. This is a confusing point and is easier to make when JavaScript is set beside compiled languages (C, Java). If a symbol table is managed by a compiler, the bindings of declarations are static. They are determined _before_ the program ever executes.

By contrast, in _dynamic scoping_, the symbol table is managed _during_ execution. That is, it changes _dynamically_. This means that declarations are processed _as they are encountered along the execution path of the program_.

## Dynamic vs Static Binding

To (hopefully) make this a little more clear, let's look at an example program written in JavaScript-like pseudocode. This example will be somewhat challenging, but will illustrate the difference between the two.

{% highlight javascript %}

let x = 1;
let y = "foo";

def p() {
	let x = 2;
	if (true) {
		let y = 10;
	}
	...
}

def q() {
	let y = 1;
	...
}

def m() {
	let x = "bar";
	...
}

{% endhighlight %}

So, let's review - there are six names in this program: `x`, `y`, `p`, `q`, and `m`. `x` and `y` have multiple declarations. Let's walk through the program, and examine the variable bindings as we go.

Pass through p()

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 2 -> 1        |
| y             | 10 -> "foo"   |
| p             | undefined     |

Note that `p` has no binding, since it doesn't return anything. (In C, we'd call this a "void" function.) It is important to emphasize here as well - a function doesn't need to _return_ a value in order to change the _state_ of a program. `x` is now bound to a new value even though `p` didn't return anything.

Now, let's pass through q()

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 2             |
| y             | 1 -> 10       |
| p             | undefined     |
| q             | undefined     |

A new symbol has been added to the table (`q`) and a new binding has been added to stack for the name `y`.

Now, let's pass through the final section of the program

| Name          | Bindings      |
| ------------- | ------------- |
| x             | "bar" -> 2 |
| y             | 1 |
| p             | undefined     |
| q             | undefined     |
| m             | undefined     |

The final symbol table will look like this:

| Name          | Bindings      |
| ------------- | ------------- |
| x             | "bar"         |
| y             | 1             |
| p             | undefined     |
| q             | undefined     |
| m             | undefined     |

Now, these symbol tables assume that bindings are determined _before_ the program ever executes (for example, by a compiler in the case of C or Java).

Now, since the distinct behavior of dynamic scope only becomes apparent when procedures are called, we'll modify the example program above slightly, then run through the symbol tables for it.

{% highlight javascript %}

let x = 1;
let y = "a";

def p() {
	let x = 2.5;
	...
	return [x, y];
}

def q() {
	let y = 42;
	p();
}

def m() {
	let x = "b";
	return q();
}

{% endhighlight %}

Examining the symbol table of a dynamically scoped program is more difficult than with static scoping; whereas we could analyze the symbol table of the statically-scoped program line-by-line, procedure-by-procedure, this is substantially more difficult with dynamic scoping - by definition the symbol table is determined _during the execution of a program_.

So rather than analyzing the program line-by-line, let's start with a symbol table showing all the values immediately available in global scope:

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 1             |
| y             | "a"           |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

Now let's start processing the bodies of the individual functions. 

Now, let's say we make a call to `p()`

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 2.5 -> 1      |
| y             | "a"           |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

Once we run through `p()`, our symbol table again looks like this - we are back in global scope: 

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 1             |
| y             | "a"           |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

But as we continue, the symbol table _from with `_q()`, but before we call `p()`_ will look like this: 

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 1             |
| y             | 42 -> "a"     |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

So what happens when we call `p()` within `q()`?

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 2.5 -> 1      |
| y             | 42 -> "a"     |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

*As you can see, the bindings associated with the names `x` and `y` depend on _the context of execution_. If `p`'s is called within `q`, it will have a different sybmole table than if it is called in the global scope.*

Now, let's take a look at our final procedure, `m`:

| Name          | Bindings      |
| ------------- | ------------- |
| x             | b -> 1        |
| y             | "a"           |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

`x` is now bound to "b" - but then a call is made to `q()`:

| Name          | Bindings      |
| ------------- | ------------- |
| x             | b -> 1        |
| y             | 42 -> "a"     |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

The symbol table, then, of `p()` when it is called by `q()` which is called by `m()`, is  

| Name          | Bindings      |
| ------------- | ------------- |
| x             | 2.5 -> b -> 1 |
| y             | 42 -> "a"     |
| p             | undefined     |
| q             | undefined     |
| m             | function      |

The important takeaway here is that nonlocal variable references cannot be predicted prior to execution; they are determined _during_ execution.

## Discussion

Now, the example symbol tables above are _extremely_ contrived, but they are (hopefully) illustrative of the underlying concepts.

You might now wonder, having already explained above that dynamic scoping is relatively rare in modern languages - _what use is any of this_? Well, the difference between the two scoping mechanisms wasn't always appreciated or well-understood, even by towering giants of computer science such as John McCarthy, creator of Lisp.

Indeed, the two scoping mechanisms were interchangeable in early Lisp implementations. The first implementation of Lisp - way back in 1958 - used dynamic scoping. And, indeed, in the 1960s, the language Logo, intended to teach basic programming concepts to children using "turtle graphics" relied on dynamic scoping _on purpose for it's supposed simplicity_.

This "simplicity" may be surprising in the present, since the most widely-used implementation of dynamic scoping - JavaScript's `this` - is a notorious source of confusion and heartache for web developers. In particular, JavaScript's `this` is an enormous source of confusion for programmers coming to JavaScript from Java. In Java, of course, the `this` keyword is a way to bind methods to a class. JavaScript, which lacks classes (although JavaScript does have a `class` keyword, it ultimately does not use class-based inheritance). In JavaScript, by contrast, `this` can't refer to a class; there are no classes†.

† Of course "classes" were introduced in ES6, but they aren't _really_ classes and there's not really a compelling reason to use them outside of certain frameworks (such as React).



