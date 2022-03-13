import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../store/slices";

export const OpenModalBtn = ({ name, className, title }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(openModal(e.target.name));
  };

  return (
    <button onClick={handleClick} name={name} className={className}>
      {title}
    </button>
  );
};
