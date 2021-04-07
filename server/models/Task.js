import mongoose from "mongoose";
import mongooseDateFormat from "mongoose-date-format";

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    
  },
  date: {
    type: Date,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    reqiured: true,
    enum: ["Personal", "Work", "Study", "Chores"],
  },
});
TaskSchema.plugin(mongooseDateFormat); // format: YYYY-MM-DD HH:mm
const Task = mongoose.model("Task", TaskSchema);

export default Task;
