// PaymentCard.jsx

import React from "react";

const PaymentCard = ({ amount, questions, validity }) => {
  return (
    <div>
      <h3>Plans Available: Basic Science and Math Questions</h3>
      <div>
        <strong>Amount:</strong> ${amount}
      </div>
      <div>
        <strong>Questions:</strong> {questions}
      </div>
      <div>
        <strong>Validity:</strong> {validity}
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default PaymentCard;
