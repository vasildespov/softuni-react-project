import { format } from "date-fns";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  due_date:{
    type:String,
  },
  date_created: {
    type: String,
    default: format(new Date(), "LLL d"),
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    reqiured: true,
    enum: ["Personal", "Work", "Study", "Chores"],
  },
});
const Task = mongoose.model("Task", TaskSchema);

export default Task;
