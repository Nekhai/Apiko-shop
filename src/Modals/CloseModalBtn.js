import React from "react";
import { useDispatch } from "react-redux";
import {
  closeModal,
  hidePassword,
  setOrderId,
  setOrderData,
  setFavoriteId,
} from "../store/slices";
import { SvgClose } from "../components/Image/svgClose";

export const CloseModalBtn = ({ className }) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(closeModal());
    dispatch(hidePassword());
    dispatch(setOrderId(null));
    dispatch(setOrderData(null));
    dispatch(setFavoriteId(null));
  };

  return (
    <button className={className} onClick={clickHandler}>
      <SvgClose />
    </button>
  );
};
