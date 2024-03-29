import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./mongoDB/connectDB.js";
import authRoutes from "./Router/auth.route.js";
import userRoutes from "./Router/user.route.js";
import taskRoutes from "./Router/task.route.js";
import analyticsRoutes from "./Router/analytics.route.js";
import { errorHandler } from "./Middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// mongoDB connection
connectDB(process.env.MONGODB_URL);

//testing route
app.get("/", (req, res) => {
  res.status(200).send("server is ok");
});

//main routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", analyticsRoutes);

// handling errors
app.use(errorHandler);

//connecting the server
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});

//if connection error
mongoose.connection.on("error", (err) => {
  console.log(err);
});
