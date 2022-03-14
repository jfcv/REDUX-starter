console.log("Hello World!");

/**
 * return a function
 */

function sayHello() {
  return function () {
    return "Elmo";
  };
}

console.log(sayHello()());

/**
 * assigning a function to a variable
 */

function azul() {
  return "azul";
}

let fn = azul;
console.log(fn());

/**
 * passing a function as an argument
 */

function printThis(fn) {
  console.log(fn());
}

printThis(azul);
