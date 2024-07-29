import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRouter from "./route/book.route.js";
import userRouter from "./route/user.route.js";
import user1Router from "./route/company.route.js";
import user2Router from "./route/admin1.route.js";
import jobsRouter from "./route/jobs.route.js"; // Import the jobs route

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoBDURI;

mongoose.connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/user1", user1Router);
app.use("/user2", user2Router);
app.use("/jobs", jobsRouter); // Add the jobs route

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
