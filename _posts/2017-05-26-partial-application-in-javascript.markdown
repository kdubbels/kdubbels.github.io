---
layout: post
title: "Partial Application in JavaScript"
date:   2017-05-26 12:31:00
categories: jekyll update
---

Partial Application.

One challenge when trying to apply functional concepts to JavaScript is grokking the distinction between partial application and currying.

In the context of a truly functional language, currying is relatively straightforward. In a functional language like Haskell, _every_ function that accept multiple parameters is a curried function. Technically, every function in Haskell only accepts a single parameter. The ability for a Haskell function to accept multiple parameters is the outcome of currying.

Let's look at a classic case of partial application in JavaScript:

```
  function makeString(ldelim, str, rdelim) {
    return ldelim + str + rdelim;
  }

  function quoteString(str) {
    return makeString("'", str, "'");
  }

  function barString(str) {
    return makeString("-", str, "-");
  }

  function namedEntity(str) {
    return makeString("&#", str, ";");
  }
```

The benefit of partial application here is clear: reducing redundancy in your code. We can now define partial application: it is an operation that initializes a subset of a function's parameters to fixed values. This has two immediately obvious benefits: the new, partially applied functions will have a smaller arity and can be given more meaningful names.

The underlying purpose of partial application is to allow us to _manage complexity_. Partial application gives us a layer of abstraction over `makeString()`, allowing for more meaningful code.

But what about currying? At least in JavaScript, partial application and currying are superfically very similar. Currying is the nesting of unary functions (that is, functions with an arity of one). The final output of the function is generated from the composition of these functions.

By contrast, partial application binds a function's arguments to predefined values, which *creates a new function* with fewer arguments. In a sense, a curried function *is* a partially applied function; the difference lies in the internals described above.

Curry.

As mentioned above, a curried function is a function that returns a new function for every logical argument that it takes. Let's look at an illustration of currying:

```
  function divide(numerator) { 
    return function(denominator) {
      return numerator/denominator;
    };
  }
```

Many "functional" JavaScript library will provide a `curry` function directly (many functional languages, such as Haskell, include a curry function as part of the language; JavaScript does not). Let's look at an example implementation:

```
  function curry(fun) {
    return function(argument) {
      return fun(argument);
    };
  }
```

This is the simplest possible implementation of currying - it takes a function and returns a function that expects a single parameter.


Using ES6 syntax, we can implement a curried addition function like this:
```
let add = x => y => x +y;
add(2)(3); // returns 5
```

But is currying as useful as partial application? The use of currying is much more limited in a language like JavaScript; in fact, partial application is a much more common technique in the wild. Currying is absolutely essential to understand in the context of strictly functional programming. I will explore the arcana of currying in JavaScript in a future post.

Bind() and Partial Application.

As of ECMAScript 5, the handy `Function.prototype.bind()` method provides a built-in method that utilizes partial application in order to simplify issues arising from dynamic scope. Taking the snippet above, we can derive the `namedEntity()` function from the `makeString()` function like this:

```
  function makeString(ldelim, str, rdelim) {
    return ldelim + str + rdelim;
  }

  var named = makeString.bind(undefined, "&#", ";");

  console.log(named(169)); // "&#169;"
```

Understanding the underlying mechanics of `Function.prototype.bind()` is a little trickier - it hinges on an understanding of `this`. Understanding `this` is a tricky subject, since it hinges on a relatively robust understanding of the difference between dynamic and lexical scope.

Dynamic scope is a tricky concept - few languages utilize dynamic scope; JavaScript utilizes dynamic scope, but it also utilizes lexical scope. Nearly all prominent modern languages make sole use of lexical scope; during the early period of research into LISP compilers, the difference between these two types of scoping was not well understood. Using `Function.prototype.bind()` is one way to reduce the confusion introduced by dynamic scope. Dynamic scope is confusing because it relies on the state of a program at runtime to determine what names are in scope. In theory, dynamic scope is simpler to understand - it is the scoping mechanism used in, for instance, the educational language Logo. However, when it sits side by side with lexical scope - as in JavaScript - it becomes enormously confusing.

In JavaScript, the value of `this` is determined by dynamic scoping. However, by using the `bind()` method, a function has its `this` keyword set to a specific value (ie, it ceases to have its value determined by dynamic scoping).