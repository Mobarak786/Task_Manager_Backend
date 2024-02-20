import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    refuserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    priority: { type: String, required: true },
    checkList: {
      type: [
        {
          title: { type: String, default: "" },
          completed: { type: Boolean, default: false },
        },
      ],
      required: true,
    },
    dueDate: { type: Date },
    state: { type: String, default: "todo" },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Task", taskSchema);
