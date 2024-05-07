import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import css from "./CreditDisplay.module.css"; // Import CSS for styling
import * as URL from "../hostdetails";

const CreditDisplay = () => {
  const [userCredit, setUserCredit] = useState(0); // State variable for user's credit

  const email = localStorage.getItem("qandaStudentEmail");

  useEffect(() => {
    fetchUserCredit(); // Fetch user's credit when component mounts
  }, []);

  const fetchUserCredit = async () => {
    try {
      // Fetch user data to get credit
      const userData = await Axios.post(`${URL.USER_URL}studentCredit`, {
        studentId: email, // Send the email in the request body
      });
      setUserCredit(userData.data.credit);
    } catch (error) {
      console.error("Error fetching user credit:", error);
    }
  };

  return (
    <div className={css.creditContainer}>
      <span className={css.creditText}></span>
      <br />

      {userCredit !== 0 ? (
        <span style={{ color: "green", fontSize: "16.5px" }}>
          Credit: {userCredit}
        </span>
      ) : (
        <span style={{ color: "red", fontSize: "15px" }}>
          <Link to={"/payment"} style={{ color: "red", fontSize: "15px" }}>
            Insufficient Credit
          </Link>
        </span>
      )}
    </div>
  );
};

export default CreditDisplay;
