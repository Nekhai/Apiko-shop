import React from "react";
import { useDispatch } from "react-redux";
import { closeModal, hidePassword } from "../store/slices";
import { SvgClose } from "../components/Image/svgClose";

export const CloseModalBtn = ({ className }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(closeModal());
    dispatch(hidePassword());
  };

  return (
    <button className={className} onClick={clickHandler}>
      <SvgClose />
    </button>
  );
};
