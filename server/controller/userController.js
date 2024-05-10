import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

// Controller function to register a new user
export const register = catchAsyncErrors(async (req, res, next) => {
  // Check if avatar file is provided in the request
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required!", 400));
  }

  // Extract necessary data from request body
  const { avatar } = req.files;
  const { name, email, phone, password } = req.body;

  // Validate request body fields
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }

  // Check if user with the provided email already exists
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }

  // Upload avatar image to Cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    avatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinary.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }

  // Create a new user in the database
  user = await User.create({
    name,
    email,
    phone,
    password,
    avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  // Send token in response after successful registration
  sendToken("User Registered!", user, res, 200);
});

// Controller function to log in a user
export const login = catchAsyncErrors(async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  // Validate email and password fields
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password!", 400));
  }

  // Find user by email and select password field
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Check if provided password matches with user's password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }

  // Send token in response after successful login
  sendToken("User Logged In!", user, res, 200);
});

// Controller function to log out a user
export const logout = catchAsyncErrors((req, res, next) => {
  // Clear token cookie and send success response
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User Logged Out!",
    });
});

// Controller function to get user's profile
export const myProfile = catchAsyncErrors((req, res, next) => {
  // Extract user information from request
  const user = req.user;

  // Send user profile information in response
  res.status(200).json({
    success: true,
    user,
  });
});
