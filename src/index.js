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
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
  console.log(getState());
});

store.dispatch({
  type: "error",
  payload: { message: "An error ocurred." },
});
