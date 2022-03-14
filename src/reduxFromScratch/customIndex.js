import store from "./customStore";
import * as actions from "../oldStore/actions";

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(actions.bugAdded("Bug 1"));

console.log(store.getState());
