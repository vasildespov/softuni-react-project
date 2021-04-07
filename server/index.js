import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import taskRouter from "./api/tasks.js";
import userRouter from "./api/users.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, exposedHeaders: "Authorization" }));
app.use(express.json());

app.use("/api/users/", userRouter);
app.use("/api/tasks/", taskRouter);
mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error.message));

app.listen(port, (req, res) =>
  console.log(`Server is listening on port ${port}`)
);
