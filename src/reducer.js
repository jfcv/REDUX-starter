import * as actions from "./actionTypes";

let lastId = 0;

/**
 * the payload of the action has to have the minimum information needed : description
 * the others params are computed at the REDUCER because this is where the
 * businness logic is computed
 */
const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id === action.payload.id ? { ...bug, resolved: true } : bug
      );

    default:
      return state;
  }
};

export default reducer;
