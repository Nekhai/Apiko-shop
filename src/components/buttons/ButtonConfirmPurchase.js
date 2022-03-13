import React from "react";
import "../../styles/buttons.scss";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices";

export const ButtonConfirmPurchase = ({ title }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // navigate("/");
    dispatch(openModal("thank"));
  };

  return (
    <button className="buttons-orange" onClick={handleClick}>
      {title}
    </button>
  );
};
