import { addBug, bugAdded } from "../bugs";
import { apiCallBegan } from "../api";
import configureStore from "../configureStore";

/**
 * Solitary Tests
 */

/*
describe("bugsSlice", () => {
  describe("action creators", () => {
    it("addBug", () => {
      const bug = { description: "a" };
      const result = addBug(bug);
      const expected = {
        type: apiCallBegan.type,
        payload: {
          url: "/bugs",
          method: "post",
          data: bug,
          onSuccess: bugAdded.type,
        },
      };
      expect(result).toEqual(expected);
    });
  });
});
*/

/**
 * Social Tests
 */

describe("bugsSlice", () => {
  it("Should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { description: "a" };
    /**
     * it says it doesn't await statement but if
     * delete it, it just throws
     */
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
