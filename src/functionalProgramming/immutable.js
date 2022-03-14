import { Map } from "immutable";
let book = Map({ title: "Harry Potter" });
console.log(book);

function publish(object) {
  return object.set("isPublished", true);
}

book = publish(book);

console.log(book);

console.log(book.toJS());
