import mongoose from "mongoose";
const analyticsSchema = new mongoose.Schema({
  todo: { type: Number },
  backlog: { type: Number },
  inProgress: { type: Number },
  completed: { type: Number },
  lowPriority: { type: Number },
  midPriority: { type: Number },
  highPriority: { type: Number },
  dueDate: { type: Number },
});

export default mongoose.model("Analytics", analyticsSchema);
