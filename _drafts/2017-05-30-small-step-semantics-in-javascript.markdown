---
layout: post
title: "Small Step Semantics in JavaScript"
date:   2017-05-30 11:31:00
categories: jekyll update
---

Let's say we want to design an abstract machine. Let's also say we know ECMAScript 6. 

1. Reducing Expressions

Let's start out by creating representations of expressions. The rules of our language will operate on the abstract syntax of these expressions.

The expressions will be represented by objects we create in JavaScript via JavaScript classes.

```
class Number {
	constructor(value) {
		this.value = value;
	}

	to_s() {
		return value;
	}

	is_reducible() {
		return false;
	}

}

class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} + {this.right}`
	}

}

class Multiply {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} * {this.right}`
	}

}
```

Now that we have our classes defined, we can begin to actually implement a small-step operational semantics. This is done by defining methods on each class that perform a reduction on our ASTs. Effectively, this takes an AST as input and returns a reduced AST as output.

Firstly, though, we'll want to have some way of checking if an expression is reducible at all, since certain expressions won't reduce to anything. For instance, what would it mean to reduce a number? In principle we _could_ reduce a number down to something further, but for our purposes, numbers are not reducible.

We'll start by defining a method that checks if an input expression is reducible. Here's an example of what it might look like:

```
is_reducible() {
	return true;
}
```

Now for the big part: defining a method that actually carries out reductions. It might look like this:

```
reduce() {
	if (this.left.is_reducible()) {
		console.log('multiply left reducible')
		return new Multiply (this.left.reduce(), this.right);
	} else if(this.right.is_reducible()) {
		console.log('multiply right reducible')
		return new Multiply (this.left, this.right.reduce());
	} else {
		return new Number(this.left.value * this.right.value);
	}
}
```

Our complete program should now look like this:
```
class Number {
	constructor(value) {
		this.value = value;
	}

	to_s() {
		return value;
	}

	is_reducible() {
		return false;
	}

}

class Add {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} + {this.right}`
	}

	is_reducible() {
		return true;
	}

	reduce() {
		if (this.left.is_reducible()) {
			console.log('multiply left reducible')
			return new Multiply (this.left.reduce(), this.right);
		} else if(this.right.is_reducible()) {
			console.log('multiply right reducible')
			return new Multiply (this.left, this.right.reduce());
		} else {
			return new Number(this.left.value + this.right.value);
		}
	}

}

class Multiply {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	to_s() {
		return `${this.left} * {this.right}`
	}

	is_reducible() {
		return true;
	}

	reduce() {
		if (this.left.is_reducible()) {
			console.log('multiply left reducible')
			return new Multiply (this.left.reduce(), this.right);
		} else if(this.right.is_reducible()) {
			console.log('multiply right reducible')
			return new Multiply (this.left, this.right.reduce());
		} else {
			return new Number(this.left.value * this.right.value);
		}
	}

}
```

Pretty slick imo :tada:

2. Working with State: Enter the Machine

By aintaining a piece of state and calling `reduce()` on it over and over, we re manually imitating the operation of an abstract machine that evaluates expressions. As we've done with the rest of our language so far, we can implement a class that represents an abstract machine. (In the traditional read-eval-print loop, this imitates the evaluation step.)

Creating a Machine class to imitate an abstract machine is actually quite simple relative to how powerful it is:
```
class Machine {
	constructor(expression) {
		this.expression;
	}

	step() {
		this.expression = this.expression.reduce();
	}

	run() {
		while (expression.is_reducible()) {
			console.log(expression);
			this.step();
		} else {
			console.log(expression);
		}
	}
}
```

We can then write an expression which instantiates the Machine and runs it, like this:
```
const expression = new Machine(new Add(new Multiply(new Number(1), new Number(2)), new Multiply(new Number(3), new Number(4))));
expression.run();
```

3. Creating an Environment

We can add several other elements to our language that work like our existing primitives (Number, Add, Multiply). But so far we are missing one crucial feature required by any language: variables.

Introducing variables will require us to introduce the concept of an _environment_.