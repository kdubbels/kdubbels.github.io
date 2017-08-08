---
layout: post
title: "Objects are weird in JavaScript"
date:   2017-08-07 12:31:00
categories: javascript objects weirdness
---


>Whereas every instance in a Java program is generated from a class serving as its template, JavaScript instances use existing objects to serve as prototypes for specialized instances."

Michael Fogus, _Functional JavaScript_

## Primitives

The key distinction within JavaScript is between a true "object" and a simpler "primitive". It is sometimes said that _everything_ in JavaScript is an object. This isn't true, although _nearly_ everything is an object. Where things get confusing is that certain primitives are not subtypes of `Object`. There are six of these primitive types (the ECMASCript specification calls them "language types", a term which I find more confusing than "primitive"):

{% highlight javsacript %}

  string
  number
  boolean
  null
  undefined
  object

{% endhighlight %}

Now, in addition to these "primitives", there are also a set of built-in constructors:

{% highlight javsacript %}

  String
  Number
  Boolean
  Object
  Function
  Array
  Date
  RegExp
  Error

{% endhighlight %}

The built-in constructors return a primitive with certain added behavior; that is, they _always return an object_. This makes the nature of both primitives and the built-in object confusing; indeed, the built-in constructors are often referred to as "built-in _objects_". Both are true; these built-in parts of the language are objects and also constructors. 

{% highlight javascript %}

const foo = '';
const bar = new String();

typeof foo // string
typeof bar // object

{% endhighlight %}

Where things get exceptionally confusing is that JavaScript will automatically coerce a primitive into one or other type of object depending on how it is used at runtime. You can see this in action using `foo` as defined above:

{% highlight javascript %}

const foo = '';
foo.charAt(2); // ''

{% endhighlight %}

If you use one of the built-in constructors to create a value, the primitive value will be what is returned by the `valueOf` method:

{% highlight javascript %}

"foo".valueOf(); // "foo"
new String("bar").valueOf(); // "bar"

var primitiveNumber = 1234;
var constructedNumber = new Number(1234);

typeof primitiveNumber // "number"
typeof constructedNumber // "object"

primitiveNumber.valueOf(); // 1234
constructedNumber.valueOf(); // 1234

{% endhighlight %}

Note that we can't simply call a method on a `number` primitive like we can with a string; it will be interpreted as an illegal string after a decimal point rather than a method call. `1234.valueOf()` kicks up the same error as `1234.foobar` - JavaScript will expect more numbers after the decimal point, and kick up an error if it doesn't get them. The one exception is if you include the decimal point. For example:

{% highlight javascript %}

1234.valueOf(); // Uncaught SyntaxError: Invalid or unexpected token
1234.0.valueOf(); // 1234

{% endhighlight %}

## Constructors in Action

Now, where things get really, _really_ confusing is that `Array`, `Object`, `Function`, and `RegExp` are all _always_ objects. But let's back up a second and compare strings in JavaScript with the way strings are constructed in C. 

One noteworthy aspect of JavaScript is that nearly everything in the language can be thought of as an object with a few extra features tacked on. This can be confusing if you come from another language, but it also lends JavaScript some novel (and interesting!) behavior. For instance, in C, strings are actually actually one-dimensional arrays of characters terminated by a null character '\0'. That is, the value "foo" is a primitive in JavaScript; it doesn't break down into further constituent parts. In C, there is no `string` type per se; rather, strings are stored in arrays of type `char`. Indeed, in C,  when strings are created, the number of characters is specified so that the compiler knows what number of sequential blocks of memory to allocate. It looks like this:

{% highlight c %}

char foobar[6] = "foobar";

{% endhighlight %}

By contrast, in JavaScript, a string is an object with certain built-in properties - _when it is created with a `String` constructor_. Let's take a look:

{% highlight javascript %}

var str = "foo";
str.bar = "bar";
str.bar // undefined

{% endhighlight %}

However, if we use the constructor form to create a string, we _can_ add a `bar` property quite easily. Behold:

{% highlight javascript %}

var str = new String("foo");
str.bar = "bar";
str.bar // "bar"

{% endhighlight %}

## Objects and Arrays

Now, contrast this with `Array`, `Object`, `Function`, and `RegExp`. Since they are _always_ objects, you will always be able to set properties on them, even when you use the literal form rather than a constructor (your head should already be spinning btw; your brain should start melting soon):

{% highlight javascript %}

var array = [1, 2, 3];
array.foo = "foo";

{% endhighlight %}

Quick - what is the value of `array.foo`? Is it `undefined` or `"foo"`? You might expect it to be `undefined` but it is, of course, `"foo"`. In fact, although in practice we will always use `object`s for creating mutable key-value pairs, we can in principle use `array`s instead. For instance:

{% highlight javascript %}

var obj = { foo: "foo", bar: "bar "};
var array = [];
array.foo = "foo";
array.bar = "bar";

obj.foo; // "foo"
obj.bar; // "bar"
array.foo; // "foo"
array.bar; // "bar"

array.length; // 0

{% endhighlight %}

This is surprising, but perhaps not yet mind-boggling. Here is where it gets insane:

{% highlight javascript %}

var regex = /(?:)/;
regex.foo = "foo";
regex; // /(?:)/
regex.foo // "foo"

{% endhighlight %}

## In Practice

In practice, it is advisible to create `number`s, `boolean`s `string`s, `array`s, and `object`s using literals. Indeed, the ability to create array and object literals is a unique feature of JavaScript. In general, use the built-in constructors for everything else, with one notable exception: functions. Functions play a very special role in JavaScript, and mastery of functions is most of the work of mastering JavaScript itself.

In this brief article I've hoped more to emphasize a few interesting features of JavaScript as an object-oriented language. The ability to create objects as literals or with constructors leads to some surprising and rarely used functionality. I strongly recommend popping open Node or your browser's console and having some fun on your own with these.