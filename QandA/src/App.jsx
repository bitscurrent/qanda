import { useState } from "react";
import Header from "./components/Header";
import QnA from "./components/QnA";
import PostQuestion from "./components/PostQuestion";
import "./App.css";
import RichTextEditor from "./components/RichTextEditor";
import Feedback from "./components/Feedback";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "./components/Logout";
import UserContainer from "./components/UserContainer";
import Profile from "./components/Profile";
import MyQuestion from "./components/MyQuestions";
import Payment from "./components/Payment";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import ViewQuestion from "./components/ViewQuestion";
import StudentDashboard from "./components/StudentDashboard";
import LandingPage from "./components/LandingPage";
import TermsandConditions from "./components/TnC";
import DonateUs from "./components/Donate";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          TermsandConditions
          <Route
            path="/tnc"
            element={<Protected Component={TermsandConditions} />}
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Protected Component={Home} />}></Route>
          <Route path="/qna" element={<Protected Component={QnA} />}></Route>
          <Route path="/header" element={<Header />}></Route>
          <Route
            path="/postquestion"
            element={<Protected Component={PostQuestion} />}
          ></Route>
          <Route
            path="/richtexteditor"
            element={<Protected Component={RichTextEditor} />}
          ></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route
            path="/usercontainer"
            element={<Protected Component={UserContainer} />}
          ></Route>
          <Route
            path="/profile"
            element={<Protected Component={Profile} />}
          ></Route>
          <Route
            path="/myquestion"
            element={<Protected Component={MyQuestion} />}
          ></Route>
          <Route
            path="/payment"
            element={<Protected Component={Payment} />}
          ></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route path="/donate" element={<DonateUs />}></Route>
          <Route
            path="/resetPassword/:token"
            element={<ResetPassword />}
          ></Route>
          {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
          {/* <Route path="/richtexteditor" element={<RichTextEditor />}></Route> */}
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<LandingPage />}></Route>
          <Route
            path="/dashboard"
            element={<Protected Component={StudentDashboard} />}
          />
          <Route
            path="/viewQuestion"
            element={<Protected Component={ViewQuestion} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
