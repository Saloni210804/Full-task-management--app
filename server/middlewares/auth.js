import ErrorHandler from "./error.js"; // Import the custom error handler
import jwt from "jsonwebtoken"; // Import JSON Web Token for token verification
import { User } from "../models/userSchema.js"; // Import the User model
import { catchAsyncErrors } from "./catchAsyncErrors.js"; // Import the catchAsyncErrors middleware

// Middleware to check if user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies; // Extract token from cookies

  // If token is not present in cookies, return an error
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }

  // Verify the token using the JWT_SECRET_KEY from environment variables
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Find the user associated with the decoded token
  req.user = await User.findById(decoded.id);

  // Proceed to the next middleware
  next();
});
