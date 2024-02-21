import jwt from "jsonwebtoken";
import createError from "../Utils/createError.js";
import Task from "../mongoDB/Models/task.model.js";

//adding the task to our db
export const addTasks = async (req, res, next) => {
  try {
    const { title, priority, checkList, dueDate } = req.body;
    if (!title || !priority || !checkList) {
      return next(createError(400, " all the mandotory fields are required"));
    }

    const taskData = new Task({
      refuserId: req.userId,
      title,
      priority,
      checkList,
      dueDate,
    });
    await taskData.save();
    res
      .status(201)
      .send({ success: true, message: "task has been added", data: taskData });
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const Query = req.query.date;

    //fetching tasks
    const data = Query
      ? await Task.find({ createdAt: { $gt: new Date(Query) } }).exec()
      : await Task.find().exec();
    if (!data.length) {
      return next(createError(404, "no data found"));
    }
    res.status(201).send({ sucess: true, data: data });
  } catch (error) {
    next(error);
  }
};
export const editTasks = async (req, res, next) => {
  try {
    const { title, priority, checkList, dueDate } = req.body;
    const id = req.params.taskId;
    if (!title || !priority || !checkList) {
      return next(createError(400, " all the mandotory fields are required"));
    }

    await Task.updateOne(
      { _id: id },
      {
        $set: {
          title,
          priority,
          checkList,
          dueDate,
        },
      }
    );

    res.status(201).send({ message: "tasks has been updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteTasks = async (req, res, next) => {
  try {
    const id = req.params.taskId;
    const deletedData = await Task.findByIdAndDelete(id);
    if (deletedData) {
      return res.status(201).send({ message: "Task has been deleted" });
    }
  } catch (error) {
    next(error);
  }
};
