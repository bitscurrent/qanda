import React from "react";
import styles from "./AboutUs.module.css"; // Import CSS module for styling

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h1>About Us</h1>
      <hr />
      <p>
        We're dedicated to providing the best services to our customers. Connect
        with us on social media and share your thoughts:
      </p>
      <ul className={styles.socialIcons}>
        <li>
          <a
            href="https://www.facebook.com/profile.php?id=61559088102204"
            target="_blank"
            className={styles.socialLink}
          >
            <i className={"fab fa-facebook " + styles.icon}></i> Facebook
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/qandastudents"
            target="_blank"
            className={styles.socialLink}
          >
            <i className={"fab fa-twitter " + styles.icon}></i> Twitter
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/qandastudent"
            className={styles.socialLink}
            target="_blank"
          >
            <i className={"fab fa-linkedin " + styles.icon}></i> LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUs;
