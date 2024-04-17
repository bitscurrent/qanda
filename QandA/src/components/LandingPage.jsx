// import React from "react";
// import { Link } from "react-router-dom";
// import Logout from "./Logout";
// import styles from "./LandingPage.module.css"; // Import CSS module
// import DonateUs from "./Donate";

// const LandingPage = () => {
//   // Retrieve user name from local storage
//   const username = localStorage.getItem("username");

//   // Retrieve user's name from local storage
//   const name = localStorage.getItem("qandaStudentName");
//   console.log("Name from local storage:", name);

//   return (
//     <div>
//       <div>
//         Welcome, {name || "Guest"}!
//         <div className={styles.logout}>
//           <Logout />
//         </div>
//       </div>
//       <p>Hope you are doing well.</p>
//       <Link to="/home" style={{ textDecoration: "none" }}>
//         <div
//           style={{
//             backgroundColor: "lightyellow",
//             padding: "20px",
//             textAlign: "center",
//             cursor: "pointer", // Change cursor to pointer on hover
//           }}
//         >
//           Ask your doubt and get answers, our skilled SMEs are waiting to help
//           you out.
//         </div>
//       </Link>{" "}
//       <div
//         style={{
//           marginTop: "90px",
//           color: "red",
//         }}
//       >
//         If you like our platform and want to help us grow, consider donating us
//         through PayPal, GooglePay, etc.
//         <span>
//           <Link to={"/donate"}>Donate Us</Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import styles from "./LandingPage.module.css"; // Import CSS module
import DonateUs from "./Donate";
import Qanda from "./Qanda";

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
          Ask your doubt and get answers, our skilled SMEs are waiting to help
          you out.
        </div>
      </Link>{" "}
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
        help us maintain and improve our services, ensuring that we can continue
        to provide valuable assistance to students like you.
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
  );
};

export default LandingPage;
