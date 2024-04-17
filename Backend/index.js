import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Asset } from "./models/Assets.js"
import { Student } from "./models/Students.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import  {signup, login, askquestion, askquestionview, rtebystudent, studentprofile, studentcredit,getrtebystudent,getassetbyid}  from "./routes/user.js";
// import { UserRouter } from "./routes/user.js";

const app = express()

app.use(cors({
  origin: ["studyqanda.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT"],
}));

app.use(cookieParser())
// app.use('/auth', UserRouter)
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5400;
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// Handle sign-up request
app.post('/auth/signup', signup)
// Handle login request
app.post('/auth/login',login)
  
app.post("/askedQuestionId",askquestion)

app.post("/askedQuestionIdView", askquestionview)

// Route to fetch question and answer data by ID
app.get("/asset/:id", getassetbyid);

app.get("/", async (req, res) => {
  res.send("Backend Working Fine.")
})

// API endpoint to save HTML content
app.post("/RTEContent", rtebystudent)
// GET endpoint to retrieve all HTML content
app.get("/RTEContent", getrtebystudent);

app.post("/studentCredit", studentcredit)

app.post("/studentProfile", studentprofile)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
