function createLogMiddleware() {
  return () => next => action => {
    console.log(action.type);
    return next(action);
  };
}

const logger = createLogMiddleware();

export default logger;
