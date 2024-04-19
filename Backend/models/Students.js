import mongoose from "mongoose";

// Create a Mongoose schema for the student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  askedQuestionsId: [{ type: String }],

  credit: { type: Number, default: 1 },
});

export const Student = mongoose.model("Student", studentSchema);
