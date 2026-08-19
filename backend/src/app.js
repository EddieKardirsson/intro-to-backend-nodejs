import express from "express";

const app = express();  // Create an instance of the Express application

app.use(express.json());  // Middleware to parse JSON request bodies

// routes import
import userRouter from "./routes/user.route.js";

// Routes declaration
app.use("/api/v1/users", userRouter);

// example route: http://localhost:3000/api/v1/users/register

export default app;