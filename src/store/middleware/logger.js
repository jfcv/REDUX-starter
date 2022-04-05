const logger = (store) => (next) => (action) => {
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  // returns the promise so it processes the request
  return next(action);
};

export default logger;
