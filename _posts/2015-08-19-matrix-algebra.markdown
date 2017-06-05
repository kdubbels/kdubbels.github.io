---
layout: post
title: "DRAFT: Let's Plan You An Economy"
date:   2015-04-20 09:31:00
categories: jekyll update
---

## Chapter 1. The Problem

Let's say, for the sake of argument, we decided wanted to _plan_ our economy, rather than rely on the whims of the market place to allocate goods.

Naturally, we will want to start out by writing up a list of everything we need in our economy.

For now, let's assume we have a very simple economy - since we are nooblers at economic planning, we'll start out by producing only two products: iron and wheat. (This may sound a bit _too_ simplistic; rest assured, things get messy quite quickly.)

Now, even with our two-product economy, we still need to take account of _labor_, which is a rather unique "product". The crucial thing to realize before we start planning is that all three products interrelate: they relate to each other in the form of "inputs" and "outputs". Simply put, it will take inputs of labor to produce corn. Let's say it takes 100 "units"* of labor to produce 50 units of corn. So we say that 50 units of corn requires 100 units of labor.

Now, let's also assume that corn requires some machines in order to be planted and harvested; a unit of corn requires inputs of iron. Let's say it takes 5 units of iron to produce 50 units of corn. 

So far so good - but in order to keep growing corn year after year, we'll also have to use inputs of corn in order to get back outputs of corn. _And_ we'll need to use inputs of corn to get outputs of labor (your workers will need to eat, after all). And, importantly, those units of labor will of course in turn serve as inputs into the next crop of corn.

We can already start to see why a three sector economy is already fairly complex, particularly if we want to have enough outputs for the system to reproduce itself year after year. We can already see, however, that a simple list of products we'd like to consume won't suffice; we'll also need to take account of a surplus if we want our economy to reproduce itself past one "round" of production.

How would we go about creating a "list" that allows us to account for this intricate system of inputs and outputs? Luckily, we don't have to start conceptualizing the input-output relationship from scratch; matrix algebra provides a readymade toolkit for describing these relationships.

*In order for the products in our economy to be commensurable, we have to use some generic type of measurement; we'll use the term "unit" rather than any specific unit of measurement for simplicity's sake.

Chapter 2. Enter the Matrix

So - what is a matrix?

## Chapter 3. Start Planning

By now we should have a fair idea of how matrices work. Let's start building an economy.

Let's start with a simple, three sector economy:

&nbsp; | Wheat Input | Iron Input | Gold Input | Final Demand
- | - | - | -
**Wheat Sector** | 50 | 100 | 50 | 100
**Iron Sector** | 25 | 70 | 5 | 50
**Gold Sector** | 30 | 10 | 60| 80
**Total Input**  | 105 | 180 | 115 | &nbsp;

The _rows_ of this table show where each industry's output goes. The first three columns tell us where each physical input goes. The last column shows _final demand_, which we will explain first.

### What is Final Demand?

As we will realize by the end of this series, a 3 sector economy is already a quite complex from that vantage point of economic planning. So we'll start with an even _simpler_ economy, and assume that in our hypothetical society, there is a demand for just two products: iron and wheat. (How this demand is established is not crucial to the model presented here.) Let's say that it has been established that we want to produce 300 units of wheat and 200 units of iron. 

Armed with this knowledge, we can establish one column of our eventual input-output table:

&nbsp; | Final Demand
- | 
**Wheat Sector** | 300
**Iron Sector** | 200

Now, let's assume that a certain amount of wheat is required to produce iron, and a certain amount of iron is required to produce wheat. Note that this is only a very contrived example; in the real world, wheat isn't _directly_ used to produce iron (it may, however, be used to feed the workers who produce the iron). Also note that, if wheat or iron could be produced without _any_ inputs, there would be no need to place them in an input-output table.

How do we go about establishing _how much_ wheat is required to produce iron and vice versa? It is sometimes tempting to assume that information such as this can be derived through pure algebraic manipulation; it cannot. Rather than an analytic datum that can be discovered through a series of mathematical operations, we can only find this information through _observation_. It is, strictly speaking, an _empirical_ datum. This is easy to establish - it is, of course, the case that a technical advance could result less iron being required to produce wheat. This technological advance isn't the product of algebraic manipulation; it's a consequence of changes in the real world.

So, for the purposes of demonstration, we'll assume that this information - the quantity of wheat inputs required to make iron and the quantity of iron inputs required to make wheat - has been given to us. Let's assume that it is established that to produce 1 unit of wheat, we need .25 units of wheat and .25 units of iron.

Let's also establish that to produce one unit of iron, we need .5 units of wheat and .33 units of iron.

Now, recall that our final demand (what we want to have at the end of the production process) for wheat is 300. So, using some very basic algebra, we get the following system of equations, where f = 1 unit of wheat and g = 1 unit of iron:

{% highlight lisp %}
f = 0.25f + 0.5g + 300
g = 0.25f + 0.33g + 200
{% endhighlight %}

We can then represent these equations using matrices:

{% highlight lisp %}
| f | = | 0.25 0.5  | | f | + | 300 |
| g |   | 0.25 0.33 | | g |   | 200 |
{% endhighlight %}

Represented in Python using Numpy:

This can be further simplified algebraically:

{% highlight lisp %}
X = AX+Y
{% endhighlight %}

This final representation simplifies matters enormously: given _A_ and _Y_, find _X_.

Using Python and Numpy, we can see that I - A

{% highlight python %}

>>> j = np.matrix([[1,0],[0,1]])
>>> k = np.matrix([[.25, .5], [.25, .33]])
>>> j-k
matrix([[ 0.75, -0.5 ],
        [-0.25,  0.67]])
{% endhighlight %}

((Show a bunch of algebra!!))

We can thus see that to satisfy a final demand of 300 units of wheat and 200 units of iron, we need to produce 800 units of wheat and 600 units of iron. The final table, then, will look like this:

&nbsp; | Wheat Input | Iron Input | Final Demand
- | - | - | -
**Wheat Sector** | 200 | 300 | 300 
**Iron Sector** | 200 | 200 | 200
**Total Input**  | 400 | 500 |  