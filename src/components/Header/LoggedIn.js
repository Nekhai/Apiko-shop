import React from "react";
import "./LoggedIn.scss";
import { useSelector, useDispatch } from "react-redux";
import { ProfileSettings } from "./ProfileSettings";
import { openSetting } from "../../store/slices";

export const LoggedIn = () => {
  const login = useSelector((state) => state.login);
  const setting = useSelector((state) => state.modal.setting);

  const fullName = login.account.fullName;
  const firstName = fullName.split(" ")[0];
  const initsials = fullName.split(" ").map((item) => item[0].toUpperCase());
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    e.stopPropagation();
    dispatch(openSetting(!setting));
  };

  return (
    <div className="logged-in">
      <div className="logged-in__greeting">Welcome, {firstName}!</div>
      <div className="logged-in__initsials">{initsials}</div>
      <button className="logged-in__btn" onClick={clickHandler}>
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.09091L1.04 0L6.5 5.80364L11.96 0L13 1.09091L6.5 8L0 1.09091Z"
            fill="white"
          />
        </svg>
      </button>
      <ProfileSettings />
    </div>
  );
};
