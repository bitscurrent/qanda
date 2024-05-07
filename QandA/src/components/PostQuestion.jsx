import React, { useState } from "react";
import axios from "axios";
import css from "./PostQuestion.module.css";
import RichTextEditor from "./RichTextEditor";
import { Link, useNavigate } from "react-router-dom";
import * as URL from "../hostdetails";

const PostQuestion = () => {
  const [showTextarea, setShowTextarea] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${URL.USER_URL}submit`, formData);
      console.log("Server response:", response.data);
      // Handle success, reset form, show success message, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
      <Link to="/home"> Home</Link>
      <br />

      <RichTextEditor />
    </>
  );
};

export default PostQuestion;
