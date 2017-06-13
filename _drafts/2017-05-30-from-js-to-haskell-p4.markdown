---
layout: post
title: "From JavaScript to Haskell, Part 4: The Lambda Function"
date:   2017-05-30 11:31:00
categories: jekyll update
---

## What is a Lambda Function?

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

The `\` is intended to be visually similar to λ ("lambda").


## Lexical Scope

One way in which JavaScript can prepare you for Haskell, beyond the use of lambda functions, is the use of functions to determine scope. Like JavaScript, Haskell makes use of closures. Previously an arcane topic relegated to certain "academic" languages (LISP, Haskell itself) or to multiparadigm languages created by idiosyncratic weirdos (Ruby, Perl), closures have recently beeen introduced even to industrial OOP languages such as Java.

So, what _is_ closure? Closure ability to reference a specific instance of a variable in an "enclosing" function. A function that "closes over" some local variable is called _a_ closure. If you have written any amount of JavaScript, you have almost certainly made extensive use of closures whether you realized it or not. Let's look at an example of closure in JavaScript:

{% highlight javascript %}

const x = 4

let add1 = (y) => y+x;

let add2 = (y) => ((x) => y + x)(3)

let add3 = (y) => (y => ((x) => y + x)(1))(2)

add1(1) // returns 5
add2(1) // returns 4
add3(1) // returns 3

{% endhighlight %}

As we can see, the `x` in `add1` looks to the top-level `const x`. So far so good. But what will `add2` do? Rather than looking up the top-level `x`, it will always use the `(3)` - the `x` is already bound within the `add2` expression itself, so it will ignore the top level `x`.

What about `add3`? We can see that even though this function expression accepts an argument, the binding of `y` within the expression always be `2`. No matter what argument you pass to `add3`, it will always return `3`. Using the following code snippet, we can see this in action: 

{% highlight javascript %}

let add3 = (y) => (y => ((x) => y + x)(1))(2)

add3("foo") // returns 3
add3(NaN) // returns 3
add3() // returns 3

{% endhighlight %}

Now, let's translate the JavaScript above into Haskell below. As you can see, the closure property works the same in both languages. Closure is a common feature in functional languages; the functional language Clojure, for instance, is a pun on this concept.

{% highlight haskell %}

x = 4

add1 y = y + x

add2 y = (\x -> y + x) 3

add3 y = (\y -> (\x -> y + x) 1) 2

{% endhighlight %}

Run it in GHCI: 
{% highlight haskell %}

GHCi> add1 1
5
GHCi> add2 1
4
GHCi> add3 1
3

{% endhighlight %}

Now, the value of closure might not seem totally obvious at first. However, JavaScript luminary Douglas Crockford himself as frequently commented that closure may be the "best feature ever put into a programming language".
