import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/taskSchema.js";

// Controller function to create a new task
export const createTask = catchAsyncErrors(async (req, res, next) => {
  // Destructure request body and user ID from request
  const { title, description, dueDate, priority } = req.body;
  const createdBy = req.user._id;

  // Create a new task document in the database
  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    createdBy,
  });

  // Send success response with created task data
  res.status(200).json({
    success: true,
    task,
    message: "Task Created",
  });
});

// Controller function to delete a task
export const deleteTask = catchAsyncErrors(async (req, res, next) => {
  // Extract task ID from request parameters
  const { id } = req.params;

  // Find task by ID
  const task = await Task.findById(id);
  
  // If task is not found, send error response
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }

  // Delete the task from the database
  await task.deleteOne();

  // Send success response
  res.status(200).json({
    success: true,
    message: "Task Deleted!",
  });
});

// Controller function to update a task
export const updateTask = catchAsyncErrors(async (req, res, next) => {
  // Extract task ID from request parameters
  const { id } = req.params;

  // Find task by ID
  let task = await Task.findById(id);

  // If task is not found, send error response
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }

  // Update the task with new data
  task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send success response with updated task data
  res.status(200).json({
    success: true,
    message: "Task Updated!",
    task,
  });
});

// Controller function to get all tasks created by the current user
export const getMyTask = catchAsyncErrors(async (req, res, next) => {
  // Extract user ID from request
  const user = req.user._id;

  // Find all tasks created by the user
  const tasks = await Task.find({ createdBy: user });

  // Send success response with tasks data
  res.status(200).json({
    success: true,
    tasks,
  });
});

// Controller function to get a single task by ID
export const getSingleTask = catchAsyncErrors(async (req, res, next) => {
  // Extract task ID from request parameters
  const { id } = req.params;

  // Find task by ID
  let task = await Task.findById(id);

  // If task is not found, send error response
  if (!task) {
    return next(new ErrorHandler("Task not found!", 400));
  }

  // Send success response with task data
  res.status(200).json({
    success: true,
    task,
  });
});
