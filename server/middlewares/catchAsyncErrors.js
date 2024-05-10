// Middleware to catch asynchronous errors and pass them to the global error handler
export const catchAsyncErrors = (theFunction) => {
  return (req, res, next) => {
    // Resolve the promise returned by theFunction and catch any errors
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};
