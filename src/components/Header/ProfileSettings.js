import React from "react";
import "./ProfileSettings.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, setSetting } from "../../store/slices";

export const ProfileSettings = () => {
  const setting = useSelector((state) => state.modal.setting);
  const user = useSelector((state) => state.login.account);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(logoutUser());
  };

  const handleNavigate = () => {
    dispatch(setSetting("account"));
    navigate("/menu");
  };

  return (
    <div
      className={setting ? "profile profile__active" : "profile"}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="profile__user-info">
        <div className="profile__name">{user.fullName}</div>
        <div className="profile__email">{user.email}</div>
      </div>
      <div className="profile__links">
        <button onClick={handleNavigate} className="profile__settings-link">
          Settings
        </button>
        <button onClick={clickHandler} className="profile__logout">
          Log Out
        </button>
      </div>
    </div>
  );
};
