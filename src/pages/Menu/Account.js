import React from "react";
import "./Account.scss";
import { useSelector } from "react-redux";
import { MainInformation } from "./MainInformation";
import { ChangePassword } from "./ChangePassword";

export const Account = () => {
  const setting = useSelector((state) => state.setting.setting);

  return setting !== "account" ? null : (
    <div className="account">
      <h3 className="account__title">Main information</h3>
      <div className="account__main-form">
        <MainInformation />
      </div>
      <h3 className="account__title">Change password</h3>
      <div className="account__change">
        <ChangePassword />
      </div>
    </div>
  );
};
