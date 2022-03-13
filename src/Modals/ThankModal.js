import React from "react";
import "./ThankModal.scss";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { ButtonReturnHome } from "../components/buttons/ButtonReturnHome";
import { ButtonOrderHistory } from "../components/buttons/ButtonOrderHistory";
import { CloseModalBtn } from "./CloseModalBtn";

export const ThankModal = () => {
  const modal = useSelector((state) => state.modal.modal);

  return (
    modal === "thank" &&
    ReactDOM.createPortal(
      <div className="thank">
        <div className="thank__wrap">
          <CloseModalBtn className="thank__close" />
          <h2 className="thank__title">Thank you for your purchase</h2>
          <div className="thank__text">
            We will send you a notification when your order arrives to you
          </div>
          <div className="thank__buttons">
            <ButtonReturnHome title="Continue shopping" orange={true} />
            <ButtonOrderHistory title=" View order history" />
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
