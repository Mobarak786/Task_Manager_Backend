import Analytics from "../mongoDB/Models/analytics.model.js";
import Task from "../mongoDB/Models/task.model.js";
import createError from "../Utils/createError.js";

export const getAnalytics = async (req, res, next) => {
  try {
    // getting all task data
    const Taskdata = await Task.find().lean().exec();
    if (!Taskdata) {
      return next(createError(400), "no data found");
    }

    // filtering  data by todoTask
    const todo = Taskdata.filter((data) => data.state === "todo").length;
    // filtering data by  inprogress task
    const inProgress = Taskdata.filter(
      (data) => data.state === "inProgress"
    ).length;
    // filtering data by  backlog task
    const backlog = Taskdata.filter((data) => data.state === "backlog").length;
    // filtering data by completed task
    const completed = Taskdata.filter(
      (data) => data.state === "completed"
    ).length;
    // filtering data by lowPriority task
    const lowPriority = Taskdata.filter(
      (data) => data.priority === "low"
    ).length;
    // filtering data by midPriority task
    const midPriority = Taskdata.filter(
      (data) => data.priority === "moderate"
    ).length;
    // filtering data by highPriority task
    const highPriority = Taskdata.filter(
      (data) => data.priority === "high"
    ).length;
    // filtering data by duedate task
    const dueDate = Taskdata.filter((data) => data.dueDate).length;

    const analyticsData = await Analytics.create({
      todo,
      backlog,
      inProgress,
      completed,
      lowPriority,
      midPriority,
      highPriority,
      dueDate,
    });

    res.status(201).send({ success: true, data: analyticsData });
  } catch (error) {
    next(error);
  }
};
