import React from "react";
import "../../styles/buttons.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal, setFavoriteId, setBuyNow } from "../../store/slices";

export const ButtonReturnHome = ({ title, orange = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate("/");
    dispatch(closeModal());
    dispatch(setBuyNow([]));
    dispatch(setFavoriteId(null));
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
