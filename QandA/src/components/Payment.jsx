// Payment.jsx

import React from "react";
import PaymentCard from "./PaymentCard";
import phonePeQRCode from "./phonePeQRCode.jpeg";
import Qanda from "./Qanda.jsx";
import { Link } from "react-router-dom";
const Payment = () => {
  return (
    <div>
      <Qanda />
      <Link to={"/home"}>Home</Link>
      <br />
      <Link to={"/usercontainer"}>Back</Link>
      <img src={phonePeQRCode} alt="PhonePe QR Code" />
      <p>
        Pay here and send the screenshot with your registered email id to any of
        the following platforms, so that we can update your credit points:
      </p>
      <div>
        <strong>Email:</strong> qandastudents@gmail.com
      </div>
      <div>
        <strong>Twitter:</strong> @qandastudents
      </div>
      <div>
        <strong>Instagram:</strong> @qandastudent
      </div>
      <p>
        <i
          style={{
            color: "red",
            fontSize: "17px",
            background: "lightgreen",
          }}
        >
          We apologize for the inconvenience caused by the lack of a payment
          gateway. Rest assured, we are actively working on integrating one to
          provide a smoother payment experience in the future.
        </i>
      </p>

      {/* Example Payment Cards */}
      <PaymentCard amount={20} questions={40} validity="30 days" />
      <PaymentCard amount={10} questions={18} validity="30 days" />
      <PaymentCard amount={5} questions={8} validity="30 days" />
      {/* Add more PaymentCard components as needed */}
    </div>
  );
};

export default Payment;
