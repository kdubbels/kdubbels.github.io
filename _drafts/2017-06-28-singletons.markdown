---
layout: post
title: "Let's Talk About Singletons"
date:   2017-06-28 09:31:00
categories: jekyll update
---

When learning design patterns, a frequent question arises: "why the fuck do I need this?"" A second, related thought also often arises: "ah, that's what you call this construct I already use regularly..."

The humble _Singleton_ is one such pattern in which the second, related thought is almost instantaneous. Almost any application will utilize the Singleton in some form or other; most Rails or MEAN apps will presumably have a single database or single configuration file. That is, you have a thing with one just one instance throughout the application that is globally accessible throughout the application. 

Now, to be clear, the traditional, classic design patterns described in the Gang of Four book are strictly applicable only to languages that allow for classical-inheritance. What is crucial to grok is that object-oriented programming is perhaps more accurately called "_class-oriented_ programming" for the simple reason that languages that make use of objects do not necessarily require the use of classes (JavaScript, most notably, but also Self, Io, and Lua).

That is to say, applying the traditional Gang of Four patterns to JavaScript is a bit of a literary exercise; any design pattern in Java, C++, even Ruby can only be loosely translated into JavaScript. Describing a pattern in JavaScript as like one in SmallTalk/ C++ is more of a metaphor than anything.

However, several of JavaScript's more interesting features make implementing these "metaphorical" design patterns surprisingly easy. As the Gang of Four describes, the intent of the Singleton pattern is fairly straightforward: "Ensure a class only has one instance, and provide a global point of access to it." Without thinking too much, we can come an approximate solution almost instantaneously:

{% highlight javascript %}
const singleton = {
	prop: "foo bar"	
};
{% endhighlight %}

:tada: Our first Singleton! :tada:

Since all JavaScript objects are unique - even if they have the same properties and values - _all_ objects are tantamount to Singletons. The only formal difference here would that a Singleton has defined by the Gang of Four must be globally accessible; since creating objects in JavaScript is trivially easy, we've already cleared this hurtle.

So let's look at how we could approximate the "true" Singletons found in other languages by using `new`. The idea here is to use a constructor that, instead of creating totally new objects, creates new pointers to one object. Of course, this is a contrived example, but for now we are exploring concepts, not engineering an application.*

{% highlight javascript %}

function Universe(){
	if (typeof Universe.instance === "object") {
	    return Universe.instance; 
	}

	this.start_time = 0;
	this.bang = "Big";

	Universe.instance = this;

	// implicit return;
	// return this;
}

const uni1 = new Universe();
const uni2 = new Universe();

uni1 === uni2  // returns `true`

{% endhighlight %}



*The following snippet is taken from Stoyan Stefanov's "JavaScript Patterns"