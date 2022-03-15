import configureStore from "./store/configureStore";
import { bugAdded, bugRemoved, bugResolved } from "./store/bugs";

const store = configureStore();

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

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));

store.dispatch(bugResolved({ id: 1 }));

/**
 * unsubscribe()
 * allows one to unsubscribe from a store
 * so it doesn't notify changes anymore
 */

unsubscribe();

store.dispatch(bugRemoved({ id: 1 }));

console.log(store.getState());
