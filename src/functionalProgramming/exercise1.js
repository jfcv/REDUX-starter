import { pipe } from "lodash/fp";

const input = { tag: "JAVASCRIPT" };

const extract = (prop) => (obj) => obj[prop];
const toLowerCase = (str) => str.toLowerCase();
const wrap = (openingTag) => (closingTag) => (str) =>
  `${openingTag}${str}${closingTag}`;
const transform = pipe(extract("tag"), toLowerCase, wrap("(")(")"));

/**
 * output = "(javascript)"
 */
const output = transform(input);
console.log(output);
