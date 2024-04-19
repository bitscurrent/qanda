import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Asset } from "./models/Assets.js";
import { Student } from "./models/Students.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {
  signup,
  login,
  askquestion,
  askquestionview,
  rtebystudent,
  studentprofile,
  studentcredit,
  getrtebystudent,
  getassetbyid,
} from "./routes/user.js";
// import { UserRouter } from "./routes/user.js";
import nodemailer from "nodemailer";

const app = express();

app.use(
  cors({
    origin: ["https://studyqanda.netlify.app"],
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(cookieParser());
// app.use('/auth', UserRouter)
app.use(bodyParser.json());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5400;
const password = process.env.PASSWORD;
const mongoURI = process.env.MONGODB_URI;
const EMAIL = process.env.EMAIL;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// Route for sending OTP
app.post("/auth/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

    // console.log(otpStorage["dilipboidya.office@gmail.com"], "Stored OTP");

    // Log the OTP and email for debugging
    console.log("Generated OTP:", otp, "for email:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, // Your Gmail address
        pass: password, // Your Gmail password or app-specific password
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for signup: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ status: "success", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ status: "error", message: "Failed to send OTP" });
  }
});

// Route for verifying OTP
app.post("/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  console.log("Received OTP:", otp, "for email:", email);

  try {
    // Check if OTP exists in storage
    const storedOtp = otpStorage[email];
    console.log("Stored OTP:", storedOtp);

    if (!storedOtp) {
      return res.status(404).json({ error: "OTP not found or expired" });
    }

    // Verify OTP
    if (storedOtp == otp) {
      // If OTP is valid, remove it from storage (for one-time use)
      delete otpStorage[email];
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for resetting password
app.post("/auth/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    student.password = hashedPassword;
    await student.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Temporary storage for OTPs
let otpStorage = {}; // Ensure otpStorage is initialized at the top level

app.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Generate random OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP

    // Store the OTP in temporary storage
    otpStorage[email] = otp;
    console.log("Stored OTP:", otpStorage[email]); // Log stored OTP

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, // Your Gmail address
        pass: password, // Your Gmail password or app-specific password
      },
    });

    // Define email options
    const mailOptions = {
      from: EMAIL,
      to: email, // Email address to send OTP
      subject: "Forgot Password OTP",
      text: `Your OTP for password reset: ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Update MongoDB Student model with new password
    await Student.findOneAndUpdate({ email }, { password: newPassword });

    // Send response
    res.json({ status: "success", otp });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ status: "error", message: "Failed to send OTP" });
  }
});

// Handle sign-up request
app.post("/auth/signup", signup);
// Handle login request
app.post("/auth/login", login);

app.post("/askedQuestionId", askquestion);

app.post("/askedQuestionIdView", askquestionview);

// Route to fetch question and answer data by ID
app.get("/asset/:id", getassetbyid);

app.get("/", async (req, res) => {
  res.send("Backend for student is working fine...");
});

app.get("/testing", async (req, res) => {
  res.send("testing...");
});

// API endpoint to save HTML content
app.post("/RTEContent", rtebystudent);
// GET endpoint to retrieve all HTML content
app.get("/RTEContent", getrtebystudent);

app.post("/studentCredit", studentcredit);

app.post("/studentProfile", studentprofile);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
