const numbers = [1, 2, 3];

//adding at the tail
const added = [...numbers, 4];
console.log(added);

//adding at the middle
const index = numbers.indexOf(2);
const middle = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

console.log(middle);

//removing
const removed = numbers.filter((number) => number !== 2);
console.log(removed);

//updating
const updated = numbers.map((number) => (number === 2 ? 20 : number));
console.log(updated);
