import React from "react";
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.css";
import Qanda from "./Qanda";
import Logout from "./Logout";
import CreditDisplay from "./CreditDisplay";
import DonateUs from "./Donate";

const Header = () => {
  return (
    <>
      <div className={css.mainContainer}>
        <div className={css.heading}>
          <div className={css.header}>
            <NavLink
              to="/home"
              style={{ textDecoration: "none" }}
              activeclassname={css.active}
            >
              QandA
            </NavLink>
          </div>

          <div className={`${css.bellIconDiv} ${css.askquestion}`}>
            <NavLink to="/usercontainer" activeclassname={css.active}>
              <i className={"fas fa-cog " + css.userIcon}></i>
            </NavLink>
          </div>

          <div className={`${css.bellIconDiv} ${css.askquestion}`}>
            <i className="fas fa-bell"></i>
          </div>

          <NavLink
            className={css.askquestion}
            to="/postquestion"
            activeclassname={css.active}
          >
            + Ask Question
          </NavLink>

          <NavLink
            className={css.viewQuestion}
            to="/viewQuestion"
            activeclassname={css.active}
          >
            My Questions
          </NavLink>
          <CreditDisplay />
          {/* <DonateUs /> */}

          <NavLink
            className={css.viewQuestion}
            to="/donate"
            activeclassname={css.active}
          >
            Donate Us
          </NavLink>

          <Logout />
        </div>
      </div>
    </>
  );
};

export default Header;
