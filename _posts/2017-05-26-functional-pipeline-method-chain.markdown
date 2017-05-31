---
layout: post
title: "Method Chain vs. Functional Pipeline"
date:   2017-05-26 12:31:00
categories: jekyll update
---

1. Back on the Chain Gang

Everything so far is building toward my own deeper appreciation of the functional paradigm.

To understand why a method chain isn't functional, it is necessary to understand just what a method is in the first place. Simply put, a method is a function attached to an object. An object, in turn, is simply a bundle of data and methods.

But what is a function in the first place? A function is a relation between a set of inputs and a set of outputs with the property that each input is related to exactly one output. In this sense, JavaScript's `function` keyword only adds to the confusion: not all functions are functions in the strict sense. 

So, how does method chaining actually work? Each method returns an object, allowing the calls to be chained together in a single statement without requiring variables to store the intermediate results. As you may recall from above, creating new variables to store intermediate results was *exactly* how I wrote Underscore in the beginning:

```
	var numberArray = [1,2,3,3,4];
	var unique = _.uniq(array);
	function containsThree(arr) {
		return	_.contains(arr, 3);
	};
	containsThree(numberArray); // returns true
```

This can be refactored using Underscore's method chaining.

```
	var numberArray = [1,2,3,3,4];
	_.chain(numberArray)
	  .uniq()
	  .contains(3)
	  .value();
```

Much more terse, and much more readable all at once!

2. Chain vs. Pipeline

But is this technique truly "functional"? Let's use another Underscore method, `_.tap()` to see. Tap works by "tapping" into the method chain to perform operations on intermediate results. The tap method accepts a callback function - an "interceptor" - that performs work on the object passed to it.

Let's look at an example of Underscore's method chaining in action:

```
	function alert(x) {
		console.log(x);
	}

	var numberArray = [1,2,3,3,4];
	_.chain(numberArray)
	  .tap(alert)
	  .uniq()
	  .tap(alert)
	  .contains(3)
	  .tap(alert)
	  .value();
```

The "trick" to making method chaining work is to always return a reference to the object at the end of the method.

Let's look at a (non-Underscore) example of method chaining:

```
function Book (title, author) {
	this.getTitle = function() {
	    return "Title: " + title;
	}

	this.getAuthor = function() {
		return "Author: " + author;
	}

	this.replaceTitle = function(newTitle) {
	    var oldTitle = title;
	    title = newTitle;
	}

	this.replaceAuthor = function(newAuthor) {
	    var oldAuthor = author;
	    author = newAuthor;
	} 
}

function TechBook (title, author, category) {
    this.getCategory = function() {
        return "Technical Category: " + category;
    }

	Book.apply(this, arguments);

	this.changeAuthor = function(newAuthor) {
	    this.replaceAuthor(newAuthor);

	    return this;
	};
}
```

The crucial line, of course, is "this":
```
	return this;
```

Returning `this` returns the `TechBook` object. Within the TechBook constructor, `this` is set explicitly by the `apply()` method. Here, `Book.apply(this, arguments)` applies the `this` of `TechBook` to `Book` and feeds `Book` the arguments supplied to the `TechBook` constructor.

Underscore is more sophisticated than this example; its method chain works by returning a "wrapped" Underscore object. Underscore is too big to explain in detail here - although an annotated source is available, but here is one key snippet:
``
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };
```

The `instance` object at the beginning of the chain above looks like this:
```
{
	_wrapped: [1, 2, 3, 3, 4],
	_chain: true
}
```

The method chain terminates once it hits the `value()` method, which looks like this internally:
```
  _.prototype.value = function() {
    return this._wrapped;
  };
```

Failing to call the `value()` method at the end of the chain will then return the wrapped object itself, like this:

{
	_wrapped: true,
	_chain: true
}

You might now be wondering, how could Underscore method chaining be functional if it depends on returning an object over and over again? Isn't this *exactly* how object-oriented programming works?

The answer, of course, is YES. Method chaining is a construct within the object-oriented paradigm. By claiming to be "functional", the Underscore docs sow confusion amongst anyone knew to the functional paradigm. Rather than utilizing a "functional" paradigm to write JavaScript, Underscore simply uses the tried and true method chain, which - by definition - utilizes OOP.

So, having come this far, you might wonder what is wrong with method chaining?

The answer, of course, is nothing. Method chaining exists because it is one way to write perfectly readable code. It is simply one construct amongst many, and its "correct" application hinges on the exact problem you are trying to address.

The problem isn't with method chaining per se, but rather with the confusion introduced by Underscore's use of method chaining. Method chaining creates code that is tightly coupled to the owning object; it limits the expressiveness of the code. Again - this isn't necessarily an issue. Writing method chains in Underscore can produce perfectly good code. But it isn't "really" functional.

(Indeed, Underscore confuses matters even more by using "functional-like" terminology to describe its own methods. For instance, Underscore's tap method will be familiar to students of "true" functional programming as the "K-combinator".

Combinators are higher-order functions that can combine more basic/primitive constructs - like functions, or even other combinators - and then control the flow of a program. A purely functional language won't contain constructs like conditionals or loops; combinators do this work instead.)

So, what is the functional alternative to the method chain? The answer is what I will call, after Luis Atencio, the "functional pipeline".

Chapter Five. Put Haskell in Your Pipe.

Let's introduce the Haskell notation for describing a function. Let's say, for instance, you'd like to create a function that adds one number to another number, and then returns the sum.

Using Haskell notation, we'd describe this function like this:
```
	add :: Number -> Number -> Number
```

Which we could then translate into JavaScript as:

```
	var add = function(x) {
		return function(y) {
			return x + y;
		}
	}

	var add3 = add(3);
	add3(4) // returns 7
```

The `add()` function also illustrates a principle known as "currying" (the Haskell language is named after a fellow by the name of "Haskell Curry" fwiw). In currying, a multivariable function is converted into a sequence of functions that accept a single argument.

Currying forms the basis for creating a functional pipeline.

Lets look at one canonical implementation of currying in JavaScript, from the now defunct Prototype library:
```
Function.prototype.curry = function() {
	var fn = this,
	    args = Array.prototype.slice.call(arguments);

	return function() {
	    return fn.apply(this, args.concat(Array.prototype.slice.arguments));
	}
}
```

The crucial part is that rather than returning an *object*, while currying returns a *function*.

The curry method, then, works by creating a closure that holds the original function and the original arguments that will be curried. As mentioned above, this method then returns a function that returns the result of calling the *original function*, passing it the arguments from the original invocation of the curry method itself.

Now, the key difference between Underscore's method chain and a truly functional "pipeline" is *composition*. The concept of composition is more general than functional programming; the idea of composition is to be able to "compose" smaller chunk programs into one larger chunk (which in turn may be composed with another big chunk and so on).

The alternative to chain, then, is a compose function - the output of compose is another function that's called on actual arguments. The composition of two functions, then, is a new function that directly maps the inputs of the first function unto the outputs of the second. This is difficult stuff, but it can be expressed in Haskell notation like this:

```
	g :: A -> B
	f :: B -> C
```

The function g maps the input A to the output B. The function f maps the input B to the output C. Composition occurs when a new function is created that maps A -> C. In Haskell notation, the composition of g :: A -> B and f :: B -> C looks like this:

```
	f(g) = compose :: (B -> C) -> (A -> B) -> (A -> C)
```

(If you remember your calculus 101 course, this is equivalent to "f dot g".)

In order to compose functions, into a pipeline (rather than chain methods to an object), we need to abandon Underscore altogether. Enter Ramda.js.

Chapter Six. Ramda: The Final Frontier.

Without going into the mechanics of the compose function above, let's assume we have a namespace "R", and we can call compose on it. We can refactor the Underscore code to look like this:

```
R.compose(R.contains(3), uniq);
```

Now, what is the advantage to R.compose() over _.chain()? Arguably, readability is a factor but - and this is crucial! - for a mind trained to use a method chain over function composition, function composition does not necessarily offer greater readability.

Afterword.

I will return to the topic of composition in a future post. For now, the takeaway should be that Underscore isn't "really" functional, that method chaining is an OOP construct, and that composition *may* offer advantages in readability over method chaining.