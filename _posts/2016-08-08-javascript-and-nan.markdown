How do you get "not a number" to be a number? Far from being an arcane discussion at home in the work of Hegel or Heidegger, this is a real-live source of hours of debugging fun in JavaScript!

I came across a fun little bug earlier this week when trying to process a data set for D3.

My dataset consisted of an array of objects. The specifics here don't really matter, so here is a contrived approximation:

const array = [
  {foo:1, bar:1, baz:1},
  {foo:NA, bar:2, baz:3},
  {foo:1, bar:1, baz:2}
];

For the purpose of the visualization I was building, I needed to find values in the array by their exact values. 