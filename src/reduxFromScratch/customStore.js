import reducer from "../oldStore/reducer";

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const dispatch = (action) => {
    state = reducer(state, action);

    for (let i = 0; i < listeners.length; i++) listeners[i]();
  };

  const getState = () => {
    return state;
  };

  return {
    subscribe,
    dispatch,
    getState,
  };
};

export default createStore(reducer);
