import { produce } from "immer";

let book = { title: "Harry Potter" };

function publish(object) {
  return produce(object, (draft) => {
    draft.isPublished = true;
  });
}

let updated = publish(book);

console.log(book);
console.log(updated);
