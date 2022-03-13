import React from "react";
import "../../styles/buttons.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSetting, closeModal } from "../../store/slices";

export const ButtonOrderHistory = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSetting("orders"));
    navigate("/menu");
    dispatch(closeModal());
  };
  return (
    <button className="buttons-orange-border" onClick={handleClick}>
      {title}
    </button>
  );
};
