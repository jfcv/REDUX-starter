import { createSlice } from "@reduxjs/toolkit";

/**
 * actions: reducers()
 */
let lastId = 0;
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs.splice(index, 1);
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;

/**
 * selector function
 * takes the state and returns the computed state
 */
export const getUnresolvedBugs = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved);

export default slice.reducer;
