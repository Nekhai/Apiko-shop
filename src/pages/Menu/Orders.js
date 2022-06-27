import React, { useEffect, useState } from "react";
import "./Orders.scss";
import { useSelector } from "react-redux";
import { useFetch } from "../../app/App";
import { OrderItem } from "./OrderItem";
import { OrderModal } from "../../Modals/OrderModal";

export const Orders = () => {
  const setting = useSelector((state) => state.setting.setting);
  const [orders, setOrders] = useState(null);

  const url = "/api/orders?offset=0&limit=20";
  const { fetchData } = useFetch(url);

  useEffect(() => {
    setOrders(fetchData);
  }, [fetchData]);

  if (!orders) {
    return <div></div>;
  }

  return setting !== "orders" ? null : (
    <div className="orders">
      {orders.map((item) => (
        <OrderItem
          key={item.id}
          id={item.id}
          totalPrice={item.totalPrice}
          date={item.createdAt}
        />
      ))}
      <OrderModal />
    </div>
  );
};
