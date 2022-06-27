import React from "react";
import { useDispatch } from "react-redux";
import { openModal, setOrderId } from "../../store/slices";

export const OrderItem = ({ id, totalPrice, date }) => {
  const dispatch = useDispatch();

  const refDate = date.slice(0, 10).split("-").reverse().join(".");

  const handleClick = (itemId) => {
    dispatch(setOrderId(itemId));
    dispatch(openModal("order"));
  };

  return (
    <button onClick={() => handleClick(id)} className="order-items">
      <div className="order-items__info">
        <div className="order-items__text">
          <p>Order ID:</p>
          <p>Date:</p>
        </div>
        <div className="order-items__numbers">
          <p>{id}</p>
          <p>{refDate}</p>
        </div>
      </div>
      <div className="order-items__price">
        <p className="order-items__text">Price</p>
        <p className="order-items__numbers">$ {totalPrice}</p>
      </div>
    </button>
  );
};
