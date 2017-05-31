---
layout: post
title: "From JavaScript to Haskell, Part 1: Function and Procedures"
date:   2017-05-30 11:31:00
categories: jekyll update
---

This article presumes you are a JavaScript developer (or, at least, a developer with a fair amount of JavaScript experience). It also assumes you are curious about Haskell, but are confused about the how and why of Haskell. Haskell has been described by Perl creator and all-around hacker legend Larry Wall as "sort of a language by geniuses, for geniuses." 

I tried several times to get started on Haskell, but it was always just a little too weird, a little too alien. Syntactically, it just doesn't look like other languages I've used. When I first approached it, it challenged my understanding of just what a function is. Even deeper, it challenged my understanding of what data itself is.

It wasn't until I started approaching Haskell from the standpoint of JavaScript that the language started to "click".

First, a word on JavaScript itself. JavaScript is a bastard mutt of a language ("multiparadigm"). Haskell, by contrast, is the purest functional language in existence. Whereas Haskell was designed by committee over several years to effectively be the most perfect functional programming language, JavaScript was designed by one guy in about a week and a half. As originally conceived, JavaScript was intended to be Scheme for the web browser. This was nixed, and Java-like syntax was introduced. Confusingly, while JavaScript picks up much of its syntax from Java, it had very little in common under the hood. That is to say, while JavaScript began as a functional language, it is a very confusing functional language: one that has both an idiosyncratic inheritance mechanism (the prototype chain) and that utilizes objects.

"Just as C is the nearly perfect embodiment of the von Neumann style of programming, Haskell is the purest functional programming language you can learn."

Haskell, unlike JavaScript, was never intended for commercial use. Whereas JavaScript began as hybrid of Scheme and Self with Java and Perl syntax sprinkled on top, Haskell was designed expressly to embody a certain conceptual purity. This gives Haskell a tremendous pedagogical value, but also makes it exceptionally intimidating to programmers accustomed to things like C-style syntax (and, indeed, JavaScript can be viewed as, in part, an attempt to surreptiously create a Scheme using C-style syntax).

Part 1. Functions and Procedures in JavaScript.

To begin our journey into functional programming, we must ask - just _what_ is a function?

Right away, things get confusing. One of the stranger aspects of JavaScript syntax that isn't immediate obvious is the `function` keyword itself. First, what is a function? As we recall from middle-school algebra, a function is a relation that associates an input to a single output according to some rule.

By this definition, is a "function" in JavaScript actually a function?

The answer to this isn't straightforward, owing to JavaScript's inherent mutt bastard nature. A function in JavaScript _can_ be a proper function in the mathematical sense, but it need not be one necessarily.

Let's look at some examples.

{% highlight javascript %}

function isCurrentYearLeapYear() {

    const year = new Date().getFullYear();
	
	if (year % 4 !== 0) {
	   return false;
	} else if (year % 100 != 0) { 
	   return true;
	} else if (year % 400 != 0) {
	    return false;
	} else {
	    return true;
	}
}

{% endhighlight %}

Is `isCurrentYearLeapYear` a function in the mathematical sense?

The answer, of course, is a big fat "nah". Why? As mentioned above, there are effectively three parts to a function: the input, the output, and the mapping between the two. So, first thing first, does isCurrentLeapYear even take an input? The answer, again, is a big fat "nah". No argument is actually provided - that is, there is no input as we would expect in a true function.

We could, of course, modify `isCurrentYearLeapYear` to take an input. Let's see what that might look like: 

{% highlight javascript %}

let currentYear = new Date().getFullYear();

function isYearLeapYear(year) {
	
	if (year % 4 !== 0) {
	   return false;
	} else if (year % 100 != 0) { 
	   return true;
	} else if (year % 400 != 0) {
	    return false;
	} else {
	    return true;
	}
}

isYearLeapYear(currentYear);

{% endhighlight %}

We've modified the "function" to accommodate an input. Is it a function now? The answer is... yes. Each input maps to _one_ output (it's okay that all inputs map to only one of two outputs). You might wonder, if `isCurrentYearLeapYear` isn't a function, just what is it?

The answer is that it is a _procedure_ (in honor of Scheme! It could also be called, after FORTRAN, a _subroutine_). The crucial point here is that it isn't taking in an input, even though it returns an output. This distinction between a _procedure_ and a _function_ will continue to be significant, and we will return to it repeatedly in this series.

Let's look at another example.

{% highlight javascript %}

function print(message) {
	alert(message);
	console.log(message);
}

print("foo bar");

{% endhighlight %}

Is this a function? The answer, again, is no. Although the function "does something" and although it accepts input, it doesn't return a value. In general, any form of `echo` or `print` or so on is a "void function" - no value is returned.

How could we change `print` to make it into a function? Simple:  

{% highlight javascript %}

function print(message) {
	return message.toString();
}

print("foo bar");

{% endhighlight %}

The new `print` function is superficially similar, but it returns a value.

Let's look at one final example.

{% highlight javascript %}

function addRandom(number) {
	return number + Math.random();
}

addRandom(1);

{% endhighlight %}

Is this a function? Again, no. Why not? `addRandom` takes an input and returns an output - so far, so good. But things get hairy in the body of the procedure. By adding a random number to our input, we can never know in advance what the output will be.

Okay, now that we've examined the distinction between a "proper" function and what we are here referring to as "procedures", how does Haskell compare?

Simply, all functions in Haskell follow three rules that force them to behave like functions in math:
• All functions must take an argument.
• All functions must return a value.
• Anytime a function is called with the same argument, it must return the same value. (This is known as "referential transparency".)

That is to say, the procedures above - `print`, `addRandom`, and `isCurrentYearLeapYear` - have no direct equivalent in Haskell; they each violate one or more of the above rules.

Well, enough preliminaries, let's get down to some Haskell!

Part 2. Functions in Haskell.

The simplest possible function in Haskell looks like this:

{% highlight haskell %}

simple x = x

simple "Hello world"

{% endhighlight %}

`simple` will simply return whatever argument is passed to it.

The task of examining what is and is not a function in Haskell is simplified dramatically; any procedure that isn't a function won't be interpeted by the compiler. In this way, Haskell is far less _risky_ than other languages, JavaScript included (as any internet user can attest, JavaScript is an _incredibly_ risky language).

We'll explore this more in part 2.