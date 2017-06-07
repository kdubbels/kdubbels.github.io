---
layout: post
title: "From JavaScript to Haskell, Part 3: Variables"
date:   2017-05-30 11:31:00
categories: jekyll update
---

Let's look at a piece of code that is valid syntax in both JavaScript and Haskell:

{% highlight javascript %}
x = 2
x = 3
x = 4
{% endhighlight %}

So, if we were to run this in the console, what is the final value of `x`? The answer, of course, is `4`. A variable in JavaScript can be redefined at any point after its initial declaration. Indeed, lots of JavaScript only works by taking advantage of this "feature".

What if we tried to load this same bit of code into GHCI? You'll see something like this:
{% highlight haskell %}
file.hs:3:1:
    Multiple declarations of ‘x’
    Declared at: file.hs:1:1
                 file.hs:2:1
                 file.hs:3:1
Failed, modules loaded: none.
{% endhighlight%}

What does that mean? It means that you can't redeclare a variable once it exists in your environment. We can already see one potential advantage of this; just look at the JavaScript snippet above. Instead of being sequential lines, imagine those multiple declarations of `x` were scattered across hundreds of lines of code - or, for that matter, across hundreds of different files.

Of course, it is also worth mentioning that the scoping rules in JavaScript are a bit, well, idiosyncratic. One of the weirder quirks of the language from the beginning (ES6 provides "fixes" to the problem) is that variables declared without the `var` keyword automatically are in global scope. So, let's look at another snippet of JavaScript, similar to the first: 

{% highlight javascript %}
var x = 2
var x = 3
var x = 4
{% endhighlight %}

Now, what is the value of `x`? It is still `4`; there is only one scope in the snippet. Let's look at a snippet with multiple scopes:

{% highlight javascript %}
var x = 2

function assignX() {
	x = "foo";
}

var x = 4
x // 4
assignX();
x // "foo"
{% endhighlight %}

Naturally, this is a _highly_ contrived example, but you get the point - the value of x is, well, not going to be super obvious. (It goes without saying, of course, that the variable name `x` is also pretty bad stuff.)

Now, JavaScript has fixed some of these issues with ES6 by introducing the `let` and `const` keywords. Let's try our original snippet with `const` this time instead of `var`:

{% highlight javascript %}
const x = 2
const x = 3
const x = 4
{% endhighlight %}

If you paste that into your console, you'll immediately get this message:

{% highlight javascript %}
Uncaught SyntaxError: Identifier 'x' has already been declared
{% endhighlight %}

The `const` keyword enforces referential transparency by disallowing a variable to be redeclared. In this way, ES6 _can_ be written to work more like Haskell.

Now, you might be thinking, isn't part of the point of variables to avoid repetitive code? If we can't reassign a variable, how do we do something as simple as incrementing a value? Look at the following JavaScript snippet, for instance:

{% highlight javascript %}
var x = 0;

[1,2,3].forEach(function() {
	x += 1;
});
x // 3
{% endhighlight %}

Here's where Haskell should start to cause miniature explosions in your brain. Simple JavaScript snippets like the above have no direct translation into Haskell; that is, you'll have to rethink your approach to the initial problem.

Okay, so we didn't cover Haskell so much in this part - but learning Haskell isn't just about learning a new syntax for the same stuff you're already doing. Learning Haskell is just as much about learning an entirely new approach to problems. JavaScript is a terrific language to learn - if also an eternally frustrating one - because its multiparadigm nature allows for many approaches to any given problem. JavaScript even has classes now for proper object-oriented programming! But this multiparadigm nature also means that JavaScript allows for a relatively lax discipline. Indeed, as originally conceived, JavaScript was intended to be a forgiving, easy to learn language. (As web applications have gotten more complex, these "quirks" have made JavaScript a challenging language at a large-scale, but that is a different story.)

By contrast, Haskell is unforgiving - strict typing, referential transparency, and so on. In the next part, we will get a further with learning actual Haskell syntax.