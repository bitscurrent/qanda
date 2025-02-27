import React, { useState } from "react";
import css from "./Signup.module.css"; // Import CSS module
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as URL from "../hostdetails";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple form submissions

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Disable form submission

    try {
      if (!isOtpSent) {
        // Generate and send OTP
        const otpResponse = await Axios.post(`${URL.USER_URL}auth/send-otp`, {
          email,
        });
        if (otpResponse.data.status === "success") {
          setIsOtpSent(true);
          setError("");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      } else {
        // Verify OTP
        const response = await Axios.post(`${URL.USER_URL}auth/signup`, {
          name,
          username,
          email,
          password,
          otp,
        });
        if (response.data.status) {
          navigate("/login");
        } else {
          setError("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Re-enable form submission
    }
  };

  return (
    <div className={css.signupContainer}>
      <form className={css.signupForm} onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          title="Password must be at least 6 characters long"
        />

        {!isOtpSent ? (
          <button type="submit" disabled={isSubmitting}>
            Send OTP
          </button>
        ) : (
          <>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
            <button type="submit" disabled={isSubmitting}>
              Verify OTP
            </button>
          </>
        )}

        {error && <p className={css.error}>{error}</p>}

        <p>
          Have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
