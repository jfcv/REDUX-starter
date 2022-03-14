import store from "./store/store";
import { bugAdded, bugRemoved, bugResolved } from "./store/actions";

console.log(store);

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

/**
 * calls the reducer gives it the state and the action
 * and gets the updated state
 *
 * updated = reducer(state, action)
 */

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugAdded("Bug 2"));
store.dispatch(bugAdded("Bug 3"));

store.dispatch(bugResolved(1));

/**
 * unsubscribe()
 * allows one to unsubscribe from a store
 * so it doesn't notify changes anymore
 */

unsubscribe();

store.dispatch(bugRemoved(1));

console.log(store.getState());
