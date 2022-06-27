import React, { useEffect } from "react";
import "../../styles/buttons.scss";
import { useDispatch } from "react-redux";
import {
  addToCart,
  closeModal,
  showAddedModal,
  hideAddedModal,
  countCart,
} from "../../store/slices";

export const ButtonAddToCart = ({
  title,
  id,
  amount,
  price,
  name,
  setAmount,
  // setItemData,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ productId: id, quantity: amount, price: price }));
    // dispatch(hideAddedModal());
    dispatch(showAddedModal(name));
    dispatch(countCart());
    setAmount(1);
    // clearData(null);
    dispatch(closeModal());
    // setItemData(null);
  };

  // useEffect(() => {
  //   return () => setItemData(null);
  // });

  return (
    <button className="buttons-orange-border" onClick={handleClick}>
      {title}
    </button>
  );
};
