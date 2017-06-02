---
layout: post
title: "Arrow Functions in JavaScript"
date:   2017-05-26 12:31:00
categories: jekyll update
---

Arrow Functions in JavaScript.

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