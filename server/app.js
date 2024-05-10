import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config({ path: "./config.env" });

// Enable CORS with options
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow requests from frontend URL
    methods: ["GET", "PUT", "DELETE", "POST"], // Allow specified HTTP methods
    credentials: true, // Allow cookies to be included in requests
  })
);

app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.json()); // Parse JSON bodies of incoming requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies of incoming requests

// Configure file upload middleware
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for file uploads
    tempFileDir: "/tmp/", // Directory to store temporary files
  })
);

// Route middleware for user-related endpoints
app.use("/api/v1/user", userRouter);

// Route middleware for task-related endpoints
app.use("/api/v1/task", taskRouter);

// Establish database connection
dbConnection();

// Global error handler middleware
app.use(errorMiddleware);

export default app;
