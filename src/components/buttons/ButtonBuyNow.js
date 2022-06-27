import React from "react";
import "../../styles/buttons.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBuyNow, closeModal, setId } from "../../store/slices";

export const ButtonBuyNow = ({ title, id, amount, price }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setBuyNow([{ productId: id, quantity: amount, price: price }]));
    navigate("/cart");
    dispatch(closeModal());
    dispatch(setId(null));
  };

  return (
    <button className="buttons-orange" onClick={handleClick}>
      {title}
    </button>
  );
};
