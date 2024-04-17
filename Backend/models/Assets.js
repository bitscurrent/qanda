import mongoose from "mongoose";

const htmlContentSchema = new mongoose.Schema({
    question: {type: String,},
    studentId: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Add date field with default value
    solve: { type: Boolean, default: false },
    feedback: {
      likes: { type: Number, default: 0 }, // Number of likes
      dislikes: { type: Number, default: 0 }, // Number of dislikes
      comments: [{ type: String }], // Array of comments
    },
    skippedQuestionsExpertId: {type: Array,}, // Array of skipped question numbers
    questionKey: { type: Number },
    answer: {type: String,},
    solvedOn: {type:Date,},
    assigned: { type: Boolean, default: true, },
    askedBy: { type: String },
    askedOn: {type:Date,default: Date.now },
  });
  
export const Asset = mongoose.model("Asset", htmlContentSchema);
