---
layout: post
title: "Lambda Calculus Part 3: Evaluation"
date:   2017-05-23 12:31:00
categories: jekyll update
---

So you've made it far enough in λ calculus that you now understand the three types of expressions. The next obvious step is how to _actually do stuff with the expressions_. This is where the two rules of evaluation come in. (There is a third rule, but it is of less importance in a quick intro like this one.)

The first rule is called α conversion. An α conversion replaces one name with another to ensure you don't have naming collisions. This may seem relatively trivial - since the meaning of an expression isn't changed - but it will become very important once we introduce recursion.

The second rule is called β reduction. A β reduction is how you apply a function in λ calculus: the replacement of a bound variable with an argument in a function body.

As Mark Chu-Carrol describes it:
"If you have a function application, you can apply it by replacing the function with the body of the λ and then taking the argument expression and replacing all uses of the parameter in the λ with the argument expression." (_Good Math_, p. 225)

This may seem like quite a mouthful, but β reduction has a deep significance: with it, the λ calculus can perform any computation that can by carried out by a machine. 

Let's look at an example of β reduction that harks back to part 1:

{% highlight lisp %}
(λx.(λy.x+y)) 3 4
{% endhighlight %}

The first step in the β reduction is to apply the first parameter, which reduces to:

{% highlight lisp %}
(λy.3+y) 4
{% endhighlight %}

Which in turn reduces to:

{% highlight lisp %}
3+4
{% endhighlight %}

Which is, of course:

{% highlight lisp %}
7
{% endhighlight %}

A name clash (sometimes also referred to as "the name capture problem") arises when a β reduction places an expression with a free variable in the scope of a bound variable with the same name as the free variable. So, α conversion is the process which removes the name clash.

Let's look at a λ expression where α reduction will resolve a name clash:

{% highlight lisp %}
(λx.(λy. x + y)) y)
{% endhighlight %}

The first occurrence of y in the expression above is bound, while the second - the one on the far right - is free. If we were to replace `x` by `y` blindly, we would get the incorrect reduction `(λy. y + y)`. Applying α conversion we arrive at the following steps:

{% highlight lisp linenos %}
((λx.(λy. x + y)) y)
((λx.(λz. x + z)) y)
(λz. y + z)
{% endhighlight %}

This all may seem a bit abstract for now, so we'll look at the two different evaluation strategies of λ expressions in the next part. In the final parts, we'll show how λ calculus is _Turing complete_ by constructing numbers and flow of control.