import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const user = req.user;
  const body = req.body;
  console.log(body);
  const newTask = new Task(body);
  try {
    await newTask.save();
    await user.tasks.push(newTask);
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
    return res.status(200).send(`Task Deleted`);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const editTask = async (req, res) => {
  const taskId = req.params.taskId;
  const body = req.body;
  const user = req.user;
  try {
    await user.tasks.pull({ _id: taskId });
    const newTask = await Task.findByIdAndUpdate(taskId, body);
    await user.tasks.push(newTask);
    await user.save();
    return res.status(200).send(`Task Updated`);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ author: userId });
    return res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
export const getTask = async (req, res) => {};
