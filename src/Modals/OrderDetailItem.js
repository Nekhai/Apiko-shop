import React from "react";
import "./OrderDetailItem.scss";
import { Image } from "../components/Image/Image";

export const OrderDetailItem = ({ title, path, price, quantity }) => {
  return (
    <div className="order-detail">
      <div className="order-detail__img">
        <Image path={path} name={title} />
      </div>
      <div className="order-detail__text">
        <div className="order-detail__title">{title}</div>
        <div className="order-detail__quantity">
          <p>Items:</p>
          <p className="order-detail__quantity-number">{quantity}</p>
        </div>
      </div>
      <div className="order-detail__line"></div>
      <div className="order-detail__price">
        <p className="order-detail__price-text">Price:</p>
        <p className="order-detail__number">$ {price}</p>
      </div>
    </div>
  );
};
