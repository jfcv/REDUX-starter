import { addBug, bugAdded } from "../bugs";
import { apiCallBegan } from "../api";
import configureStore from "../configureStore";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
    /**
     * objects
     */
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };

    /**
     * fake API setted up to make tests frequently
     */
    const fakeAxios = new MockAdapter(axios);
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    const store = configureStore();
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
  });
});
