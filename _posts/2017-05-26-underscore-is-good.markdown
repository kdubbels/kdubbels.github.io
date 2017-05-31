---
layout: post
title: "Underscore: Good as Hell"
date:   2017-05-26 12:31:00
categories: jekyll update
---

Method Chaining vs. Function Pipeline

CHAPTER ONE. Functional Buzz.

When I first started developing web apps, Backbone was all the rage (well, actually, Angular was all the rage, but everyone is always a year or two behind what everyone else is doing). Since Backbone apps made heavy use of jQuery and Underscore, these were some of the first tools I used while learning JavaScript.

It took me a very long time to warm to Underscore. "Functional programming" had become a buzzword, and Underscore was vaguely associated with functional programming in my mind (as the Underscore docs announce, Underscore "provides a whole mess of useful functional programming helpers"), so I figured I might as well start using Underscore in the Backbone app I worked on.

When I first started working with Underscore, I was working on an app that looked through an array of strings and created a dictionary of the number occurrences of a string.

Here's one (cringeworthy) snippet:

```
	function countWords(array) {
		var unique = _.uniq(array);

		var words = [];
		var count = [];

		for (var i = 0; i < unique.length; i++) {
		    words.push(unique[i]);
		    count.push(0);
		}

		for (var i = 0; i < array.length; i++) {
		    var position = words.indexOf(array[i]);
		    count[position] = count[position] + 1;
		}

		var zipped = _.object(words, count);
		return zipped;
	}
```

I won't dwell on this example too extensively, but I utilized this general "pattern" throughout my code:

```
	var numberArray = [1,2,3];
	var unique = _.uniq(array);
	function containsThree(arr) {
		return	_.contains(arr, 3);
	};
	containsThree(numberArray); // returns true
```

I wrote "functional" code this way for a few months - none of my colleagues ever rose any objections. In fact, they were stuck in the outmoded paradigm of imperative code, while I was lightyears ahead, reveling in the promised land of "functional" programming!

CHAPTER TWO. Learning Through Failure.

Around this time I was contemplating a move related to my wife's career change. I managed to score an interview at a startup that emphasized their MVP app made heavy use of a functional programming in its React front-end.

I walked into that interview with a fair amount of confidence - it involved some paired programming intended to give me an opportunity to show off my functional programming skills. I'd never worked with React before, so I read up on how React components work. The programming challenge was to take an updating feed of JSON data and represent it in the DOM in some interesting way. Primarily being a D3 dev up to that point, I decided to make a pie chart.

The data looked like this:

```
{"props":
	{
		"amount":74.37,
		"shopper":{"gender":"female","name":"Debra Ramirez"},
		"cart":[{"type":"snack","name":"chips","quantity":3},{"type":"beverage","name":"coffee","quantity":11},{"type":"fruit","name":"apple","quantity":7},{"type":"vegetable","name":"cauliflower","quantity":4}]
	}
}
```

This wholly contrived feed would update once a second with a new "order".

Needless to say, I created a gigantic jumble of horrific "functional" code. I won't show the whole thing here - for reasons of space and humiliation - but here is one prime snippet:


```
	const itemCount = types.map(function(type){
        const newItem = {};
	    newItem.type = type; 
	    newItem.count = 0;
	    vizData.forEach(function(items) {
	    	items.forEach(function(item) {
		        item.type == newItem.type ? newItem.count += 1 : "";
		    });
	    });
	    return newItem;
	});
```

At this point, I was starting to utilize ES6 (`const`) and I dimly grasped how `map` worked, but you might be puzzled by the nested `forEach` within `map`'s callback function. At this juncture, I knew `map` was a good thing to use, but I wasn't quite sure why. I also knew `for` loops were bad, but my solution was to replace them with `forEach`. At this point, I knew that functional programming was good because it made it easier to reason about programs - but my code seemed to become increasingly convoluted with every "functional" construct I adopted.

Although the interview was effectively a flop, it ended up being a watershed for my own understanding. Since human beings are primarily motivated by humiliation, I made a concerted effort to actually grok the functional paradigm.

One important insight that came out of my paired programming interview was the importance of the _method chain_.

It hadn't occurred to me to write underscore using a method chain. As the Underscore docs describe, a Underscore methods can be chained together by using... _.chain(). Like so:

```
var lyrics = [
  {line: 1, words: "I'm a lumberjack and I'm okay"},
  {line: 2, words: "I sleep all night and I work all day"},
  {line: 3, words: "He's a lumberjack and he's okay"},
  {line: 4, words: "He sleeps all night and he works all day"}
];

_.chain(lyrics)
  .map(function(line) { return line.words.split(' '); })
  .flatten()
  .reduce(function(counts, word) {
    counts[word] = (counts[word] || 0) + 1;
    return counts;
  }, {})
  .value();
 ```

Of course, chaining methods was nothing to me; that same bit of awful, garbage code I wrote above also contained snippets such as:

```
  const pie = d3.layout.pie()
	  .sort(null)
	  .value(function(d) { return d.count; });
```

But at this point, it hadn't occurred to me to simply chain together Underscore methods when transforming data. Indeed, I could now write extremely concise, terse code rather than rely on the excessive use of new variables and functions.

Having learned the magic of Underscore's `_.chain()` method, I immediately started refactoring existing repos and incorporating it into all my new projects. But something gnawed away at me - isn't a method *by definition* an OOP construct? How could I be doing functional programming if I am chaining methods on an object? Isn't Underscore's method chaining effectively identical to jQuery's method chaining?

Thinking more deeply about these issues set off a real revolution in brain. This is when I started to learn Haskell.