import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch((dispatch, getState) => {
  // call an API
  // promise resolved -> dispatch()
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
  console.log(getState());
  // promise rejected -> dispatch()
});

// store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));

// store.dispatch(projectAdded({ name: "Project 1" }));

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugAssignedToUser({ bugId: 2, userId: 1 }));

// console.log("get bugs by user!");
// const bugsUser1 = getBugsByUser(1)(store.getState());
// console.log(bugsUser1);

// console.log("unresolved bugs!");
// console.log(getUnresolvedBugs(store.getState()));
