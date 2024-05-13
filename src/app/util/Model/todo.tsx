import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false,timestamps: true }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
