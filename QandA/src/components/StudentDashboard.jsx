import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AboutUs from "./AboutUs";
import "@fortawesome/fontawesome-free/css/all.css";
import Qanda from "./Qanda";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token"); // Assuming you store token in local storage

  // If user is not authenticated, redirect to login page
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Qanda />
      <h1>Dashboard</h1>
      <p>Welcome to the QandA platform!</p>
      <Link to="/home">
        <i className="fa-solid fa-house" />
        <br />
        Home
      </Link>

      <div>
        <div
          style={{
            marginTop: "90px",
            color: "blue",
            background: "lightgoldenrodyellow", // Adjusted color here
            textAlign: "center", // Center text horizontally
            padding: "10px",
            fontSize: "17px",
          }}
        >
          If you've found our platform helpful and would like to support our
          ongoing efforts, please consider making a donation. Your contributions
          help us maintain and improve our services, ensuring that we can
          continue to provide valuable assistance to students like you.
        </div>
        <br />
        <span>
          <Link to={"/donate"} style={{ textDecoration: "none" }}>
            <button
              style={{
                width: "25%",
                textAlign: "center",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            >
              Donate Us
            </button>
          </Link>
        </span>
      </div>
      <AboutUs />
    </div>
  );
};

export default StudentDashboard;
