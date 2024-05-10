import mongoose from "mongoose";

// Define the task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String, // Title of the task
  },
  description: {
    type: String, // Description of the task
  },
  status: {
    type: String, // Status of the task: completed or incomplete
    enum: ["completed", "incomplete"], // Enumerated values
    default: "incomplete", // Default value
  },
  archived: {
    type: Boolean, // Indicates if the task is archived or not
    default: false, // Default value
  },
  createdBy: {
    type: mongoose.Schema.ObjectId, // Id of the user who created the task
    required: true, // Field is required
  },
  dueDate: {
    type: Date, // Due date of the task
    default: Date.now, // Default value is current date/time
    // New field for due date
  },
  priority: {
    type: String, // Priority level of the task: high, medium, low
    enum: ["high", "low", "medium"], // Enumerated values
    default: "medium", // Default value
    // New field for priority
  },
  createdAt: {
    type: Date, // Date when the task was created
    default: Date.now, // Default value is current date/time
  },
});

// Create Task model from the schema
export const Task = mongoose.model("Task", taskSchema);
