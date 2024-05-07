import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as URL from "../hostdetails";

const UserContainer = () => {
  const navigate = useNavigate(); // Move useNavigate inside the functional component
  Axios.defaults.withCredentials = true;

  const handleLogout = () => {
    Axios.get(`${URL.USER_URL}auth/logout`)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h3>
        <Link to="/home"> Home</Link>
        <br />
      </h3>
      <h3>
        <Link to="/profile"> Profile</Link>
        <br />
      </h3>
      <h3>
        <Link to="/viewQuestion"> My Questions</Link>
        <br />
      </h3>
      <h3>
        <Link to="/payment"> Payment</Link>
        <br />
      </h3>
      <h3>
        <Link to="/tnc"> Terms and Conditions</Link>
        <br />
      </h3>

      <h3>
        <Link to="/aboutus"> About Us</Link>
        <br />
      </h3>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserContainer;
