import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import styles from "./LandingPage.module.css"; // Import CSS module
import DonateUs from "./Donate";
import Qanda from "./Qanda";
import AboutUs from "./AboutUs";
import "@fortawesome/fontawesome-free/css/all.css";

const LandingPage = () => {
  // Retrieve user name from local storage
  const username = localStorage.getItem("username");

  // Retrieve user's name from local storage
  const name = localStorage.getItem("qandaStudentName");
  console.log("Name from local storage:", name);

  return (
    <div>
      <Qanda />
      <div
        style={{
          marginTop: "7px",
        }}
      >
        Welcome, {name || "Guest"}!
        <div className={styles.logout}>
          <Logout />
        </div>
      </div>
      <p>Hope you are doing well.</p>
      <br />
      <Link to="/home" style={{ textDecoration: "none" }}>
        <div
          style={{
            backgroundColor: "lightyellow",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer", // Change cursor to pointer on hover
          }}
        >
          <span>
            <i className="fa-regular fa-circle-question" />
          </span>
          <br />
          Ask your doubt and get answers, our skilled SMEs are waiting to help
          you out.
          <hr />
          <button style={{ width: "10%", background: "black" }}>ASK</button>
        </div>
      </Link>{" "}
      <AboutUs />
    </div>
  );
};

export default LandingPage;
