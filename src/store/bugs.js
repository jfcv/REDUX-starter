import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "./api";

/**
 * actions: reducers()
 */
let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
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
      const { bugId, userId } = action.payload;
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

  dispatch(
    actions.apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

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
