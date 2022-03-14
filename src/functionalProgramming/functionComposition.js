import { compose, pipe } from "lodash/fp";

const input = "     Javascript      ";

/**
 * functional statements
 */

const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

/**
 * functional programming example
 * using the Haskell Curry technique : Currying !
 */
const result = wrap("div")(toLowerCase(trim(input)));
console.log(result);

/**
 * compose avoids the using of all of that code
 */
const transform = compose(wrap("span"), toLowerCase, trim);
console.log(transform(input));

/**
 * pipe allows to organize the functions in order of execution
 */
const orderedTransform = pipe(trim, toLowerCase, wrap("div"));
console.log(orderedTransform(input));
