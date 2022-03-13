import React from "react";
import "../../styles/buttons.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices";

export const ButtonReturnHome = ({ title, orange = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    dispatch(closeModal());
  };
  return (
    <button
      className={orange ? "buttons-orange" : "buttons-orange-border"}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
