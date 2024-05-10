import mongoose from "mongoose";

// Function to establish database connection
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_TASK_MANAGEMENT", // Specifies the database name connected to backend
    })
    .then(() => {
      console.log("Connected to database!"); // Log success message upon connection
    })
    .catch((err) => {
      console.log(`Some error occurred while connecting to database! : ${err}`); // Log error message if connection fails
    });
};
