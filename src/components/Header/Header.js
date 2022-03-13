import React from "react";
import "./Header.scss";
import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LoggedOut } from "./LoggedOut";
import { LoggedIn } from "./LoggedIn";
import { useSelector } from "react-redux";

export const Header = () => {
  const login = useSelector((state) => state.login);

  return (
    <div className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="apiko logo" />
      </Link>
      <div className="heder__content">
        {login.status === "resolved" ? <LoggedIn /> : <LoggedOut />}
      </div>
    </div>
  );
};
