import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const user = req.user;
  const {task, info, date,category} = req.body;
  const newDate = new Date(date).toLocaleString()
  const newTask = new Task({ author: req.user._id, task, info, date, category});
  try {
    await newTask.save();
    user.tasks.push(newTask);
    await user.save();
    return res
      .status(201)
      .send({ newTask, message: "Task created successfully." });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
export const deleteTask = async (req, res) => {
  const user = req.user;
  const taskId = req.params.taskId;
  try {
    await Task.findByIdAndDelete(taskId);
    await user.tasks.pull({ _id: taskId });
    await user.save();
    return res.status(200).send(`Removed Task ${taskId} ${user.tasks}`);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const editTask = async (req, res) => {};

export const getAllTasks = async (req, res) => {
  const userId = req.user.id;
  const category = req.body.urlCategory;

  try {
    if (category) {
      const tasks = await Task.find({ author: userId, category: category });
      return res.send(tasks);
    }
    const tasks = await Task.find({ author: userId });
    return res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getTask = async (req, res) => {};
