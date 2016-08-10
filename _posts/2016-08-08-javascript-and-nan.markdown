How do you get "not a number" to be a number? Far from being an arcane discussion at home in the work of Hegel or Heidegger, this is a real-live source of hours of debugging fun in JavaScript!

I came across a fun little bug earlier this week when trying to process a data set for D3.

My dataset consisted of an array of objects. The specifics here don't really matter, so here is a contrived approximation:

const array = [
  {foo:1, bar:1, baz:1},
  {foo:NA, bar:2, baz:3},
  {foo:1, bar:1, baz:2}
];

For the purpose of the visualization I was building, I needed to find values in the array by their exact values. 

After using D3 to fetch the CSV, each value is processed in a function like this:

var data = [];

function process(incData) {
  incData[0].forEach(function(d) {
   data.push({
    foo: +d.foo,
    bar: +d.bar,
    baz: +d.baz
   });
  });
};

So far, so good - the values are converted from strings to numbers using the `+` operator. This allows for mathematical operations on values.

The problem here, of course, is that you can't search for NaNs. For instance,

const array = [NaN, "foo"];
array.indexOf("foo");
//returns 1
array.indexOf(NaN);
//returns -1

So - that is a problem. After some thought, my initial solution was straightforward. I left `"NA"` as a string in the array.

if(d.foo == "NA") {
  foo = "NA";
} else {
  foo = +d.foo
}

A slight refactor of the `process()` function lets this work:

function process(incData) {
  incData[0].forEach(function(d) {
    let foo;
    if (d.foo == "NA") {
      foo = "foo";
    } else {
      foo = +d.foo;
    }
   data.push({
    foo: foo,
    bar: +d.bar,
    baz: +d.baz
  });
});
};

This worked for the `foo` attribute of the object, but it would be mighty repetitive to do this for each attribute - imagine, for instance, that there were 20 or 30 columns per row, or even just 9 or 10.

To make the process function completely dynamic, I ended up with this:

var data = [];

function process(incData) {
  dataKeys = Object.keys(incData[0][0]);

  incData[0].forEach(function(datum) {
      const obj = {};
      dataKeys.forEach(function(key){
        let foo;
        if(datum[key] == "NA") {
          foo = "foo";
        } else {
          foo = +datum[key];
        }
        obj[key] = foo
      });
    data.push(obj);
  })
};

This converts all the strings to numbers where appropriate, while leaving the "NA" values as strings. Since a colleague found the "NA" string confusingly similar to NaN during code review, I used "foo" as an unmistakeable stand-in.


## Plot twist

Now, for the plot twist: all of this was completely unnecessary for the purposes of the original use case. For the purposes of the visualization I was working on, converting the strings to numbers in the first place turned out to be unnecessary - it was more out of (gasp) *habit* than necessity that I converted these values from strings to numbers. For all I know, there may be some performance implications (of course, almost certainly offset by the work of the initial iteration and casting) with numbers vs. strings, but that was not the original purpose.

However, programming being what it is, I learned at least one neat trick from the whole thing - using ES6 to iterate through an object in as few lines of code as possible. So, let's take a typical snippet of D3 and use apply the lessons from above to refactor to as few lines of code as possible.

Where this becomes really neat is with, for instance, dates. So, instead of doing something like

data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.foo = +d.bar;
    d.bar = +d.bar;
    d.baz = +d.baz;
  });
});

, we can do something more like

function process(incData) {
  dataKeys = Object.keys(incData[0][0]);

  incData[0].forEach(function(datum) {
      const obj = {};
      dataKeys.forEach(function(key){
        let foo;
        if(key == 'date') {
          foo = parseDate(datum[key]);
        } else {
          foo = +datum[key];
        }
        obj[key] = foo
      });
    data.push(obj);
  })
};

I think this is pretty neat, although this has gone beyond the original problem (searching for NaN), I ended up with a utilizing a neat (and under-hyped) feature of ES6. Pretty cool.
