Lately I've been learning some Java, primarily as a way to "really" learn design patterns.

So far, the experience has been okay - learning Java is like eating spinach or reading about the boring parts of US history. It isn't very fun, but it is good for you.

One thing that is really striking to me so far is that the "translations" of Java (or C++ or Smalltalk) design patterns into JavaScript are radically different. Indeed, JavaScript's underlying design seems especially bizarre when one tries to approximate Java with it.

This isn't to say, however, that JavaScript is a bad language. JavaScript is my first love and, barring something truly unseen, will probably remain my preferred language for some time to come. Indeed, JavaScript's vast expressiveness is very much a consequence of its bastard birth. Similar to English, perhaps - a barbarian tongue with caked with foreign Gallic and Latinate influences.

JavaScript, of course, began life as Brendan Eich's "Scheme for the web browser". When I first started learning Scheme my first reaction was "*this* is the language JavaScript was intended to mimic?" At least at first blush, the two have nothing in common. But once one claws through the syntactic differences, the *conceptual* similarities become apparent - higher-order functions, closures, and so on.By contrast, Java's influence on JavaScript is *immediately* apparent - and this is precisely the problem.

Java's syntactic similarities to JavaScript obscure their vast conceptual differences - it is easy to assume, for instance that *this* works identically in both languages. Even apparently identical expressions between the two languages - for instance, Math.random() - are not nearly so similar as they appear, even if they are more or less equivalent for the purposes of day-to-day programming.

What I want to do in this post, then, is to highlight two different ways to implement a Set data structure, and hopefully show how the two languages differ on a deep conceptual level, and also how the syntactic similarities can obscure these deep differences.

The first implementation will be something like a Java implementation of a Set. The second implementation will utilize JavaScript's more singular features (I am tempted here to say "functionality").