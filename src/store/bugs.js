import { createAction } from "@reduxjs/toolkit";

/**
 * actions
 */
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

/**
 * reducer
 */
let lastId = 0;

/**
 * the payload of the action has to have the minimum information needed : description
 * the others params are computed at the REDUCER because this is where the
 * business logic is computed
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );

    default:
      return state;
  }
};

export default reducer;
