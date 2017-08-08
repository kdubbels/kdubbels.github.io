---
layout: post
title: "Always 👏 use 👏 const 👏"
date:   2017-08-08 12:31:00
categories: javascript const var
---

Many of the new features of ES6 are features that have a set of well-defined use cases that the average JavaScript developer may not encounter very often. For someone who is, for instance, writing jQuery to enhance the UI of a Wordpress site, ES6 may remain a largely unknown country for quite some time.

But one new feature introduced in ES6 should be picked up and utilized by _every_ JavaScript developer in principle. (The practice of setting up Babel for production is... a different story.) This feature is the introduction of the `let` and `const` keywords to declare bindings.

Before ES6, JavaScript effectively had two scopes, and two scopes only: the scope within a function, and the global scope. Additional confusion is created by "variable hoisting" - a JavaScript `var` declaration will be "hoisted" to the top of its scope, regardless of where it is actually declared. Let's take a look at an example of this working.

{% highlight javascript %}
function getValue(condition) {
    if (condition) {
        var value = "foo";

        return value;
    } else {
        return value;
    }
}

{% endhighlight %}

So - what do you expect to be returned if we pass `true` to `getValue()`? And if we pass `false`? Passing `true` will do what you'd likely expect, and return `"foo"`. But if we pass `false` will it return a `ReferenceError` or something else? Think about it for a minute, then keep scrolling.

If we pass `false` to `getValue()`, it will return `undefined`. That is because the variable _declaration_ is hoisted to the top of the function... *but not the variable _definition_*. You can think of it like this:

{% highlight javascript %}
function getValue(condition) {
	var value;
    
    if (condition) {
        var value = "foo";

        return value;
    } else {
        return value;
    }
}

{% endhighlight %}

Indeed, let's take an example of some real-world code, from `graph-scroll`, developed at Bloomberg:

{% highlight javascript %}
function graphScroll(){
  var windowHeight,
      dispatch$$1 = d3.dispatch("scroll", "active"),
      sections = d3.select('null'),
      i = NaN,
      sectionPos = [],
      n,
      graph = d3.select('null'),
      isFixed = null,
      isBelow = null,
      container = d3.select('body'),
      containerStart = 0,
      belowStart,
      eventId = Math.random(),
      offset = 200;

      function reposition(){
      	// some code here
      }

      function resize(){
      	// some code here
      }
  }

{% endhighlight %}

Look closely, and you'll notice that `windowHeight`, `n`, and `belowStart` are all declared, but not _defined_. Although this is a perfectly legal JavaScript, it is worth noting that these declarations are, strictly speaking, unnecessary. They are there to make it clear to make the inner workings of the `graphScroll()` constructor more obvious to you, the reader.

Now, let's say you recreated my contrived example function using `let` instead of `var`. What happens?

{% highlight javascript %}
function getValue(condition) {
    if (condition) {
        let value = "foo";

        return value;
    } else {
        return value;
    }
}

{% endhighlight %}

This time, `getValue(false)` _will_ return an `Uncaught ReferenceError`. Whereas `var` _hoists_ the declaration, `let` does not. The declaration only exists within the first branch of the `if-else` statement.

{% highlight javascript %}
function getValue(condition) {
    if (condition) {
        let value = "foo";

        return value; // "foo"
    } else {
        return value; //  Uncaught ReferenceError: value is not defined
    }
}

{% endhighlight %}

Now, let's say you changed the declarations within the `graphScroll` constructor above to be `let`s instead of `var`s. Would that change the behavior of the function?


{% highlight javascript %}
function graphScroll(){
  let windowHeight,
      dispatch$$1 = d3.dispatch("scroll", "active"),
      sections = d3.select('null'),
      i = NaN,
      sectionPos = [],
      n,
      graph = d3.select('null'),
      isFixed = null,
      isBelow = null,
      container = d3.select('body'),
      containerStart = 0,
      belowStart,
      eventId = Math.random(),
      offset = 200;

      function reposition(){
      	// some code here
      }

      function resize(){
      	// some code here
      }
  }

{% endhighlight %}

The answer is... no. When placed at the top of this particular function, `let` and `var` will work the same way. The scope for both is the entirety of the function - `let` has block scope. Block scopes are created either a) inside a function or b) inside a _block_ (effectively, anything between a `{` and a `}`). Traditionally, languages with a C-based syntax have used block scope as _the_ scoping mechanism. JavaScript, however, is less a C-based language than it is a bastard Scheme that uses Java syntax. This is a historical accident that has bred decades of confusion in the JavaScript community.

## So what about const?

Okay, you may be wondering why we haven't talked about `const` yet, even though I began by demanding you 👏 only 👏 use 👏 it. `const` is itself confusing, and the confusion transcends JavaScript. The tendency - again, transcending JavaScript - is to assume that a constant is an immutable value. *THIS IS WRONG*. Let's look at an example:

{% highlight javascript %}

function getValue() {
    const array = [1,2,3];
    
    if (true) {
        array[0] = "foo";

    }

	return array;
}

{% endhighlight %}

You might expect that JavaScript will kick up an error - you've mutated the value assigned to the declaration, after all. But this is mistaken. 

{% highlight javascript %}

function getValue() {
    const array = [1,2,3];
    
    if (true) {
        array[0] = "foo";

    }

	return array;
}

getValue(); // ["foo", 2, 3]

{% endhighlight %}

This is because `const` _is not intended to freeze the value assigned to a declaration_. Rather, _`const` prevents an identifer from being re-declared_. Thus:

{% highlight javascript %}

const x = 1;
var x = 1; // Uncaught SyntaxError: Identifier 'x' has already been declared

{% endhighlight %}

That is _all_ that `const` does. Its sole purpose is to prevent the sort accidental redeclarations that can occur in JavaScript as a result of its scoping rules. `const` also forbids declarations that do not provide a definition. For instance:

{% highlight javascript %}

var foo; // undefined
const baz; // Uncaught SyntaxError: Missing initializer in const declaration

{% endhighlight %}

But wait a second - the plot thickens. Let's look at another snippet, this time using `let`:

{% highlight javascript %}

let foo; // undefined
var foo; // Uncaught SyntaxError: Identifier 'foo' has already been declared

foo = 1; // 1

{% endhighlight %}

As we can see, `let` also prevents re-declaration - but not re-definition. So why use `const`? The answer is simple: `const` is most restrictive way to declare variables. If `const` doesn't work in your particular use case, try `let`. *You should only use `var` as a last resort.* It would perhaps be extreme and certainly controversial to call using `var` a code smell, but you should think long and hard before using `var`. Let's look at one final example:

{% highlight javascript %}

let bar = [1, 2, 3];
bar[1] = 42;
bar; // [1, 42, 3]

bar = 'foo'; // Uncaught SyntaxError: Identifier 'bar' has already been declared

const bar = [1, 2, 3];
bar[1] = 42;
bar; // [1, 42, 3]

bar = 'foo'; // Uncaught TypeError: Assignment to constant variable.

{% endhighlight %}

The practical behavior is similar, but notice the difference between the `SyntaxError` and `TypeError`.

## Freeze!

So, let's say you want to do what you _thought_ `const` does - that is, declare a variable that refers to an immutable value. Does ES6 have a feature for that? The answer is... no. Luckily, ES5 introduced this feature years earlier! Let's say we have an array `[1, 2, 3]`, but we don't want to be able to mutate it. Here's how we could implement it using the `Ojbect.freeze()`, which was introduced to little fanfare in ES5.

{% highlight javascript %}

const array = Object.freeze([1,2,3]);
array[1] = 42;
array; // [1, 2, 3]

{% endhighlight %}

Notice, however, that the attempt to mutate the array in line 2 doesn't return an error, although it also doesn't successfully mutate the array either.

## But Nobody Knows How To Use Const... What Do I Do?

In general, `const` is widely misunderstood, even by people who are quite smart and should know better. So what should you do? When you see `const` in the wild, should you assume the author of the code knows what it means? Are they trying to prevent an identifier from being redeclared, or are do they think they have created a reference to an immutable value?

There is no "real" or "correct" answer to this question. You should do your best to educate other developers on your team and it is good practice to assume, at least on large open-source projects, that the community tends towards intelligence and proficiency rather than stupidity and amateurishness. Beyond that, it is always best to simply listen to your heart. 💖