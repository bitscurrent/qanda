import { Student } from "../models/Students.js";
import { Asset } from "../models/Assets.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: "https://studyqanda.netlify.app",
    credentials: true,
  })
);

app.use(cookieParser());
// app.use('/auth', UserRouter)

app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

const KEY = process.env.KEY;

export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    // Check if the email is already registered
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ status: false, message: "Email is already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new student
    const newStudent = new Student({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newStudent.save();
    // Sign-up successful
    res.status(201).json({ status: true, message: "Sign-up successful" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ email: student.email }, KEY, { expiresIn: "7d" });
    // Set token in cookie
    res.cookie("token", token, { httpOnly: true });
    // res.status(200).json({ status: true, message: 'Login successful', token });
    res.json({
      success: true,
      token,
      name: student.name,
      email: student.email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const askquestion = async (req, res) => {
  const { questionId, studentId, askedQuestionsId } = req.body;

  try {
    // Find the student by email and update their askedQuestionsId array
    const student = await Student.findOneAndUpdate(
      { email: studentId },
      { $push: { askedQuestionsId: askedQuestionsId } },
      { new: true }
    );

    // Send a success response
    res
      .status(200)
      .json({
        success: true,
        message: "Question ID saved successfully",
        student,
      });
  } catch (error) {
    console.error("Error saving asked question ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const askquestionview = async (req, res) => {
  const { studentId } = req.body;
  try {
    // Assuming Student is your Mongoose model
    const students = await Student.find(
      { email: studentId },
      { askedQuestionsId: 1 }
    );
    const askedQuestionsId = students
      .map((student) => student.askedQuestionsId)
      .flat(); // Extract askedQuestionsId arrays from students and flatten them
    res.status(200).json(askedQuestionsId);
  } catch (error) {
    console.error("Error fetching asked question IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rtebystudent = async (req, res) => {
  try {
    const { question, studentId, date, solve, askedBy, askedOn } = req.body;
    const assigned = false;

    // Create a new Asset object with the provided data
    const newHtmlContent = new Asset({
      question: question,
      studentId: studentId,
      date: date,
      solve: solve,
      assigned,
      askedOn,
      askedBy,
    });

    // Fetch the student data based on the student ID
    const student = await Student.findOne({ email: studentId });

    // Check if the student exists
    if (student) {
      // Check if the student has enough credits
      if (student.credit >= 1) {
        // Deduct one credit from the student's balance
        student.credit -= 1;
        // Save the updated student data
        await student.save();

        // Save the new HTML content
        const savedHtmlContent = await newHtmlContent.save();
        console.log("Successfully saved HTML content:", savedHtmlContent);
        // Find the student by email and update their askedQuestionsId array
        // Update the student document to add the new askedQuestionId
        await Student.findOneAndUpdate(
          { email: studentId },
          { $push: { askedQuestionsId: savedHtmlContent._id } },
          { new: true }
        );

        console.log("Successfully saved HTML content:", savedHtmlContent);
        res.json({ message: "HTML content saved successfully" });
      } else {
        res.status(400).json({ error: "Insufficient credits" });
      }
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.log("UNSUCCESSSSS", error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const studentprofile = async (req, res) => {
  const { studentId } = req.body;
  try {
    // Assuming Student is your Mongoose model
    const student = await Student.findOne({ email: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ student: student });
    console.log(student, "inside server");
  } catch (error) {
    console.error("Error fetching student credit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const studentcredit = async (req, res) => {
  const { studentId } = req.body;

  try {
    // Assuming Student is your Mongoose model
    const student = await Student.findOne({ email: studentId }); // Assuming you have user information in req.user.email

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ credit: student.credit });
  } catch (error) {
    console.error("Error fetching student credit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getrtebystudent = async (req, res) => {
  try {
    const htmlContent = await Asset.findOne(); // Retrieve all documents from the HtmlContent collection
    res.json(htmlContent); // Send the retrieved HTML content as a response
  } catch (error) {
    console.error("Error retrieving HTML content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getassetbyid = async (req, res) => {
  const { id } = req.params; // Get the ID from request parameters
  try {
    // Fetch the asset document by ID
    const asset = await Asset.findById(id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    // Extract relevant data from the asset document
    const {
      question,
      answer,
      date,
      solvedOn,
      feedback,
      likes,
      dislikes,
      comments,
    } = asset;
    // Respond with the extracted data
    res.json({
      question,
      answer,
      date,
      solvedOn,
      feedback,
      likes,
      dislikes,
      comments,
    });
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
