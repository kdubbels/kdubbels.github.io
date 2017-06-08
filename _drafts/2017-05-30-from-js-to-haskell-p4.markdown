---
layout: post
title: "From JavaScript to Haskell, Part 4: Lambdas and Closures"
date:   2017-05-30 11:31:00
categories: jekyll update
---

While closure is an increasingly familiar topic in JavaScript circles, lambda functions still have a slight air of mystery surrounding them. In fact, if you have been programming JavaScript for any length of time, it is likely you write anonymous functions somewhat regularly:

{% highlight javascript %}

var foo = function () {
	console.log('foo');
}

{% endhighlight %}

The above function is a lambda function - often called an _anonymous_ function in the world of JavaScript. However, this anonymous function must still be part of an _expression_. This means, for example, that the following snippet will result in an `Uncaught SyntaxError`:

{% highlight javascript %}

function () {
	console.log('foo');
}

// Uncaught SyntaxError: Unexpected identifier
{% endhighlight %}

The new ES6 syntax, however, does let us write lambda/ anonymous functions without requiring them to be bound to a variable. This is one use of the arrow syntax.

{% highlight javascript %}

() => {};

{% endhighlight %}

Of course, because we haven't given it a name, we cannot access this lambda again. It exists in our environment beyond our clutches. You may wonder why this feature of the arrow syntax is helpful, but it lets us immediately invoke our function, something we cannot do using the older `function` keyword without a name. It also lets us pass in arguments. For example:

{% highlight javascript %}

(() => "foobar")() // returns "foobar"

((x) => x)("foo") // returns "foo"
((x) => x)("bar") // return "bar"

{% endhighlight %}

The first function is an example of an immediately invoked lambda function. The second and third are examples of passing arguments to a lambda function.

Haskell has syntax that is similar to the ES6 arrow syntax, but also somewhat closely mimics that lambda calculus syntax (the discipline from which the term "lambda function" originates).

{% highlight haskell %}

Prelude> (\x -> x) "foo"
"foo"

{% endhighlight %}

The `\` is supposed to be visually similar to λ ("lambda").