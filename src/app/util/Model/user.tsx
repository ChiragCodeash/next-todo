import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
     
    },
    googleId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
