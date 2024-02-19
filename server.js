import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./mongoDB/connectDB.js";

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connectDB(process.env.MONGODB_URL);

//testing route
app.get("/", (req, res) => {
  res.status(200).send("server is ok");
});

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
