import React from "react";
import css from "./Donate.module.css"; // Import CSS module
import phonePeQRCode from "./phonePeQRCode.jpeg"; // Import the QR code image

const DonateUs = () => {
  const handlePayPalPayment = () => {
    // Open PayPal donation link in a new tab
    window.open(
      "https://paypal.me/deelep?country.x=IN&locale.x=en_GB",
      "_blank"
    );
  };

  return (
    <div className={css.donateContainer}>
      <h2>Donate Us</h2>
      <p>Thank you for considering supporting us!</p>

      {/* PayPal Button */}
      <button
        onClick={handlePayPalPayment}
        className={css.paypalButton}
        style={{
          width: "15%",
        }}
      >
        Donate via PayPal
      </button>
      <br />
      <h1>OR</h1>
      {/* Google Pay QR Code */}
      <div className={css.qrCodeContainer}>
        <img
          src={phonePeQRCode}
          alt="Google Pay QR Code"
          className={css.qrCodeImage}
        />
        <p className={css.qrCodeText}>Scan this QR code to donate via UPI.</p>
      </div>

      {/* Thank You Message */}
      {/* This message will be shown after successful payment */}
      <div className={css.thankYouMessage}>
        <p>Thank you for your donation!</p>
      </div>
    </div>
  );
};

export default DonateUs;
