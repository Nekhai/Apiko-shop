import React, { useEffect } from "react";
import "./OrderModal.scss";
import ReactDOM from "react-dom";
import { CloseModalBtn } from "./CloseModalBtn";
import { useSelector, useDispatch } from "react-redux";
import { OrderDetailItem } from "./OrderDetailItem";
import { setOrderData } from "../store/slices";

export const OrderModal = () => {
  const modal = useSelector((state) => state.modal.modal);
  const id = useSelector((state) => state.item.orderId);
  const token = useSelector((state) => state.login.token);
  const orderData = useSelector((state) => state.item.orderData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      dispatch(setOrderData(data));
    };
    fetchOrder();
  }, [id, token, dispatch]);

  if (!orderData) {
    return <div></div>;
  }

  const total = orderData.items.reduce((acc, cur) => acc + cur.quantity, 0);
  const refDate = orderData.createdAt
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
  const shipment = orderData.shipment;
  const address = `${shipment.address}, ${shipment.city}, ${shipment.country}`;

  return (
    modal === "order" &&
    ReactDOM.createPortal(
      <div className="order-modal">
        <div className="order-modal__wrap">
          <CloseModalBtn className="order-modal__close" />
          <h2 className="order-modal__title">Order details ID {id}</h2>
          {orderData.items.map((item) => (
            <OrderDetailItem
              key={item.product.id}
              title={item.product.title}
              path={item.product.picture}
              price={item.product.price}
              quantity={item.quantity}
            />
          ))}
          <div className="order-modal__info">
            <div className="order-modal__block">
              <div className="order-modal__text">
                <p>Date:</p>
                <p>Address:</p>
              </div>
              <div className="order-modal__number">
                <p>{refDate}</p>
                <p>{address}</p>
              </div>
            </div>
            <div className="order-modal__block">
              <div className="order-modal__text">
                <p>Items:</p>
                <p>Total:</p>
              </div>
              <div className="order-modal__number">
                <p>{total}</p>
                <p>{orderData.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
