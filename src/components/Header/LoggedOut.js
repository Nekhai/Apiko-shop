import React from "react";
import "./LoggedOut.scss";
import { OpenModalBtn } from "../../Modals/OpenModalBtn";
import { Register } from "../../Modals/Register";
import { Login } from "../../Modals/Login";

export const LoggedOut = () => {
  return (
    <div className="logged-out">
      <OpenModalBtn
        className="logged-out__btn"
        name="register"
        title="Register"
      />
      <div className="logged-out__line"></div>
      <OpenModalBtn className="logged-out__btn" name="login" title="Log In" />
      <Register />
      <Login />
    </div>
  );
};
