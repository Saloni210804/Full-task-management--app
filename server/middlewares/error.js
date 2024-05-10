class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Initialize the error message and status code
    super(message);
    this.statusCode = statusCode;
  }
}

// Middleware to handle errors globally
export const errorMiddleware = (err, req, res, next) => {
  // Set a default error message and status code if not provided
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle CastError (MongoDB ObjectID casting error)
  if (err.name === "CastError") {
    const message = `${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Send error response with status code and message
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
