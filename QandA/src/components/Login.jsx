import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import Qanda from "./Qanda";
import * as URL from "../hostdetails";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status
  const [isResettingPassword, setIsResettingPassword] = useState(false); // State to track password reset flow
  const navigate = useNavigate();

  useEffect(() => {}, []); // Empty dependency array means this effect runs only once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL.USER_URL}auth/login`, {
        email: email,
        password: password,
      });
      // console.log("Login response:", response.data);
      if (response.data.success === true) {
        console.log("Login successful, redirecting to dashboard");
        localStorage.setItem("qandaStudentEmail", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("qandaStudentName", response.data.name);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await axios.post(`${URL.USER_URL}auth/forgot-password`, {
        email: email,
      });
      alert(
        "To reset your password, an OTP has been sent to your email address."
      );
      setOtpSent(true); // Set OTP sent status to true
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${URL.USER_URL}auth/verify-otp`, {
        email: email,
        otp: otp,
      });
      setError(""); // Clear any previous error
      setOtpSent(false); // Reset OTP sent status
      setIsResettingPassword(true); // Move to password reset step
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Make API call to reset password
      await axios.post(`${URL.USER_URL}auth/reset-password`, {
        email: email,
        newPassword: newPassword,
      });
      alert("Password reset successful!");
      // Redirect user to login page after successful password reset
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Qanda />
      {/* {!otpSent && !isResettingPassword && (
        <div>
          <div className={styles.heading}>Welcome</div>
          <div className={styles.subheading}>Login</div>
        </div>
      )} */}
      <div>
        <div className={styles.heading}>Welcome</div>
        <div className={styles.subheading}>Login</div>
      </div>

      <form onSubmit={handleSubmit}>
        {!otpSent && !isResettingPassword && (
          <>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <button type="submit" className={styles.loginButton}>
              {isResettingPassword ? "Reset Password" : "Login"}
            </button>
            <p
              onClick={handleForgotPassword}
              className={styles.forgotPasswordText}
            >
              Forgot Password?
            </p>
          </>
        )}
      </form>
      {otpSent && !isResettingPassword && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.inputField}
          />

          <button onClick={handleVerifyOtp} className={styles.loginButton}>
            Verify OTP
          </button>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {isResettingPassword && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" className={styles.loginButton}>
            Reset Password
          </button>
        </form>
      )}
      {!isResettingPassword && !otpSent && (
        <p className={styles.signupText}>
          Not registered yet? <Link to="/signup">Sign up</Link>
        </p>
      )}
    </div>
  );
};

export default Login;
