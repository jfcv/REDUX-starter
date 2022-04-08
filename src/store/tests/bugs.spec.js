import { addBug, resolveBug, getUnresolvedBugs, loadBugs } from "../bugs";
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
  let fakeAxios;
  let store;

  /**
   * before Each Statement
   */

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  /**
   * helpers
   */
  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: { list: [] },
    },
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("the bugs should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs don't exist in the cache", () => {
      it("the bugs should be fetched from the server and render on the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });

        it("should be false after bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  it("Should add the bug to the store if it's saved to the server", async () => {
    /**
     * Arrange
     */
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    /**
     * Act
     */
    await store.dispatch(addBug(bug));

    /**
     * Assert
     */
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("Should not add the bug to the store if it's not saved to the server", async () => {
    /**
     * Arrange
     */
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    /**
     * Act
     */
    await store.dispatch(addBug(bug));

    /**
     * Assert
     */
    expect(bugsSlice().list).toHaveLength(0);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      /**
       * AAA pattern
       */

      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });

  it("Should mark the bug as resolved if it's saved to the server", async () => {
    /**
     * Arrange
     */
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });

    /**
     * Act
     */
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    /**
     * Assert
     */
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("Should not mark the bug as resolved if it's not saved to the server", async () => {
    /**
     * Arrange
     */
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });
    fakeAxios.onPatch("/bugs/1").reply(500);

    /**
     * Act
     */
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    /**
     * Assert
     */
    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });
});
