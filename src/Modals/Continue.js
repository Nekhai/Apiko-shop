import React from "react";
import "./Continue.scss";
import ReactDOM from "react-dom";
import { CloseModalBtn } from "./CloseModalBtn";
import { OpenModalBtn } from "./OpenModalBtn";
import { ButtonReturnHome } from "../components/buttons/ButtonReturnHome";
import { useSelector } from "react-redux";

export const Continue = () => {
  const modal = useSelector((state) => state.modal.modal);

  return (
    modal === "continue" &&
    ReactDOM.createPortal(
      <div className="continue">
        <div className="continue__wrap">
          <CloseModalBtn className="continue__close" />
          <h2 className="continue__title">
            To continue please register or log in
          </h2>
          <OpenModalBtn
            name="login"
            title="Continue to sign in"
            className="buttons-orange"
          />
          <OpenModalBtn
            name="register"
            title="Continue to register"
            className="buttons-orange"
          />
          <ButtonReturnHome title="Continue as guest" />
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
