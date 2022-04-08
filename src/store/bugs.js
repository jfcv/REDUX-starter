import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "./api";
import axios from "axios";

/**
 * ACTIONS: reducers()
 */
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list.splice(index, 1);
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;

const computeDiffInMins = (lastFetch) => {
  const milisecs = new Date() - new Date(lastFetch);
  /**
   * MAGIC NUMBERS !
   * conversion between milisecs and secs
   * 1000 milisecs in a second
   * 60 secs in a minute
   */
  return milisecs * (1 / 1000) * (1 / 60);
};

/**
 * ACTION CREATORS
 */
const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = computeDiffInMins(lastFetch);

  /**
   * MAGIC NUMBER !
   */
  if (diffInMinutes < 2)
    return console.log(
      "it's been less than 2 minutes since the last time you made a request so the information is being loaded from the cache."
    );

  return dispatch(
    actions.apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

/**
 * addBug action creator implemented using axios
 */
// export const addBug = (bug) => async (dispatch) => {
//   const response = await axios.request({
//     baseURL: "http://localhost:9001/api",
//     url,
//     method: "post",
//     data: bug,
//   });
//   dispatch(bugAdded(response.data));
// };

export const addBug = (bug) =>
  actions.apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  actions.apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  actions.apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

/**
 * SELECTORS
 */

/**
 * Memoization
 * bugs => get unresolved bugs from the cache
 */
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.list.filter((bug) => bug.userId === userId)
  );

export default slice.reducer;
