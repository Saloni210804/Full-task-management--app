import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"], // Name is required
    minLength: [3, "Name must contain at least 3 characters!"], // Minimum length for name
    maxLength: [30, "Name cannot exceed 30 characters!"], // Maximum length for name
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"], // Email is required
    unique: [true, "User already registered!"], // Email should be unique
    validate: [validator.isEmail, "Please provide valid email!"], // Email validation using validator
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number!"], // Phone number is required
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"], // Password is required
    minLength: [8, "Password must contain at least 8 characters!"], // Minimum length for password
    maxLength: [32, "Password cannot exceed 32 characters!"], // Maximum length for password
    select: false, // Password will not be selected by default
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default creation date is current date/time
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
});

// Method to compare entered password with stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JWT token for user authentication
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES, // Expiry time for JWT token
  });
};

// Create User model from the schema
export const User = mongoose.model("User", userSchema);
