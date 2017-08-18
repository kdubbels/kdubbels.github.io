---
layout: portfolio
title: "Content Management System"
date:   2017-05-20 12:31:00
image: "https://kdubbels.github.io/images/cms/cms1.png"
description: "A fully-functional, artisanal CMS built for a boutique financial services firm. I built the entire entire back-end and wrote all the JavaScript as part of a two-person team with a front-end designer."
tech: "Ruby on Rails, RSpec, Sinatra, React, jQuery, Foundation"
---


## ##What It Is

The "Content Management System" is a content management system built for a small financial services firm. It has the standard functionality of any content management system, but with extra style.

![My helpful screenshot]({{ site.url }}/images/cms/cms1.png)

## ##Technical Details

This app was originally built using the PHP MVC framework Phalcon. The original app, intended as a proof of concept, ended up being incredibly brittle and crufty, requiring massive quantities of manhours to roll out new features. I rebuilt the entirety of the back-end with Rails 4. I utilized integration testing to alleviate a major on-going complaint of the client: that every new feature broke at least two other existing features.

![My helpful screenshot]({{ site.url }}/images/cms/cms1.gif)

Also in response to client requests, I designed and built a REST API with Sinatra in order to allow quicker iteration of features requiring Ajax. Features that had taken weeks to build in the previous version now took days, or even hours. The GIFs above and below show two features I built and rapidly rolled-out using this REST API in conjunction with React (above) and jQuery (below).

![My helpful screenshot]({{ site.url }}/images/cms/cms2.gif)