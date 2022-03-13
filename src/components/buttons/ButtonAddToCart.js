import React from "react";
import "../../styles/buttons.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices";

export const ButtonAddToCart = ({ title, id, amount, price }) => {
  const dispatch = useDispatch();

  const handleClick = (itemId) => {
    dispatch(addToCart({ productId: itemId, quantity: amount, price: price }));
  };

  return (
    <button className="buttons-orange-border" onClick={() => handleClick(id)}>
      {title}
    </button>
  );
};
