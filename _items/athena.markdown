---
layout: portfolio
title: "Athena"
date:   2017-05-20 12:31:00
image: "https://kdubbels.github.io/images/athena/athena1.gif"
description: "A data visualization I built to show significant long-term trends in healthcare and medical services for athenahealth, Inc."
tech: "React, D3, CSS3"
---


## ##What It Is

I built this interactive line chart using D3 and React. Scrolling down the page triggers new lines to animate in. It also features animated explanatory text. The novelty of this chart is that previous data is faded (both the lines in the line chart and the explanatory text) when new data comes into view.

![Animated screenshot of Athena project]({{ site.url }}/images/athena/athena1.gif "Amazing event handling here")

## ##Technical Details

Two versions of this app were built. The original version was built by another developer with Angular and Highcharts. This initial app did not meet client requirements. I was brought into to "fix it". Highcharts is a great library for quick, no-effort visualizations, but I could tell immediately it was incapable of creating the final product the client wanted. After some tough conversations, I rebuilt the app in its entirety.

This was the first sizable project I ever wrote using React, although most of the work is being done by D3. The app is more or less one parent component that handles Ajax requests and three child components that do most of the direct DOM maniupation - one for the header text, one for the chart itself, and one for the text crawl on the botttom of the page.

![Animated screenshot of Athena project]({{ site.url }}/images/athena/athena2.gif "Wow - look at that blur transtion")