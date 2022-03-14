/**
 * posible actions in a bug listing application
 *
 * ADD A BUG
 * RESOLVED A BUG
 * REMOVED A BUG
 */
const actions = [
  {
    type: "bugAdded",
    payload: {
      description: "...",
    },
  },
  {
    type: "bugRemoved",
    payload: {
      id: 1,
    },
  },
  {
    type: "bugResolved",
    payload: {
      id: 1,
    },
  },
];
