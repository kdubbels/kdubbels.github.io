---
layout: post
title: "From JavaScript to Haskell, Part 2"
date:   2017-05-30 11:31:00
categories: jekyll update
---

Now, let's look at one of the more aggravating features of JavaScript.

{% highlight javascript %}
let myList = [1,2,3]
myList.reverse()
let newList = myList.reverse()
{% endhighlight %}

What do you expect the values of `myList` and `newList` to be? Why? Keep your answer in mind while we look at a similar snippet in Haskell (we haven't yet covered Haskell syntax, but it should be somewhat intuitive what is going on):

{% highlight haskell %}
let myList = [1,2,3]
*Main> reverse myList
[3,2,1]
let newList = reverse myList
*Main> newList
[3,2,1]
*Main> myList
[1,2,3]
{% endhighlight %}

Now let's look at the values of the arrays in JavaScript:

{% highlight javascript %}
myList = [3,2,1]
newList = [1,2,3]
{% endhighlight %}

Why do the two differ? The answer is that in functional programming there are _no side-effects_ and _no mutation_. This means that if you want to perform some operation on a data structure, rather than modify the existing data structure (that is, mutating it), a new data structure is created _by the operation itself_. By contrast, certain methods in JavaScript will modify an array _in place_, rather than creating a new one. In Haskell, once I've created `myList`, it never changes.

Let's look at one common pattern in JavaScript to bring out the difference between these two ways of dealing with data structures.

Let's say we have an array and we want to add an item to the end of the array. A common way to perform this task is to use JavaScript's `pop` method, which appends an item to the end of the array. By definition, this _mutates_ the existing array. The original array is lost forever.

{% highlight javascript %}
var arr = [1,2,3]
arr.push(4);
arr // [1,2,3,4]
{% endhighlight %}

In Haskell, by contrast, rather than mutating an existing data structure, you'd simply create a new one.

{% highlight haskell %}
*Main> let list  = [1,2,3]
*Main> let newList = list ++ [4]
*Main> list
[1,2,3]
*Main> newList
[1,2,3,4]
{% endhighlight %}

This style reduces uncertainty, and makes it easier to reason about state: since existing data structures don't change over the course of a program. The inability to mutate data structures makes it much easier to reason about Haskell code.

We'll discuss the primary data structure in Haskell - the list - later in this series. In the next part, however, we'll see how one important ES6 innovation makes JavaScript more like Haskell. And this is a good thing.