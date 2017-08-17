---
layout: post
title: "Partial Application in Haskell"
date:   2017-05-26 12:31:00
categories: jekyll update
---

"When you capture a value inside a lambda function, this is referred to as a closure."

"Anytime you might want to use a closure (which in Haskell is pretty much anytime), you want to order your arguments from most to least general."

"When you call any function with fewer than the required number of parameters in Haskell, you get a new function that’s waiting for the remaining parameters. This language feature is called partial application."

"If you found using closures a bit confusing so far, you’re in luck! Thanks to partial application, you rarely have to write or think explicitly about closures in Haskell"