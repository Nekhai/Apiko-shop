import React, { useState, useEffect } from "react";
import "./CartItem.scss";
import { useFetch } from "../../app/App";
import { Image } from "../../components/Image/Image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  changeQuantity,
  countCart,
  setBuyNow,
  countBuyNow,
} from "../../store/slices";
import { Count } from "../../components/buttons/Count";

export const CartItem = ({ id, quantity }) => {
  // console.log(id, quantity);
  // const basket = useSelector((state) => state.cart.total);
  const buyNowItem = useSelector((state) => state.cart.buyNow);
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const [amount, setAmount] = useState(quantity);

  const dispatch = useDispatch();
  const url = `/api/products/${id}`;
  const { fetchData } = useFetch(url);

  const handleRemove = () => {
    if (buyNowItem.length) {
      navigate("/");
      dispatch(setBuyNow([]));
    } else {
      dispatch(removeFromCart(id));
      dispatch(countCart());
    }
  };

  useEffect(() => {
    // console.log(fetchData);
    setItemData(fetchData);

    if (buyNowItem.length) {
      dispatch(countBuyNow(amount));
    } else {
      dispatch(changeQuantity({ productId: id, quantity: amount }));
      dispatch(countCart());
    }

    // dispatch(setBuyNow([]));

    // console.log(basket);

    return () => {
      setItemData(null);
    };
  }, [fetchData, dispatch, id, amount, buyNowItem.length]);

  if (!itemData) {
    return <div></div>;
  }

  return (
    <div className="cart-item">
      <div className="cart-item__img">
        <Image path={itemData.picture} name={itemData.title} />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__title">{itemData.title}</div>
        <div className="cart-item__buttons">
          <button
            className="cart-item__remove"
            onClick={() => handleRemove(id)}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.9488 3.86486H18.9569V2.88108C18.9218 1.3 17.6604 0.0351351 16.0836 0H9.91644C8.33962 0.0351351 7.07817 1.3 7.04313 2.88108V3.86486H1.05121C0.455526 3.86486 0 4.32162 0 4.91892C0 5.51622 0.455526 5.97297 1.05121 5.97297H2.90836L4.02965 23.2946C4.09973 24.8054 5.32615 26 6.83288 26H19.1671C20.6739 26 21.9003 24.8054 21.9704 23.2946L23.0916 5.97297H24.9488C25.5445 5.97297 26 5.51622 26 4.91892C26 4.32162 25.5445 3.86486 24.9488 3.86486ZM11.248 19.6757C11.248 20.273 10.7925 20.7297 10.1968 20.7297C9.60108 20.7297 9.14555 20.273 9.14555 19.6757V10.1541C9.14555 9.55676 9.60108 9.1 10.1968 9.1C10.7925 9.1 11.248 9.55676 11.248 10.1541V19.6757ZM16.8544 19.6757C16.8544 20.273 16.3989 20.7297 15.8032 20.7297C15.2075 20.7297 14.752 20.273 14.752 19.6757V10.1541C14.752 9.55676 15.2075 9.1 15.8032 9.1C16.3989 9.1 16.8544 9.55676 16.8544 10.1541V19.6757ZM16.8544 3.86486H9.14555V2.88108C9.18059 2.45946 9.49596 2.14324 9.91644 2.10811H16.0836C16.504 2.14324 16.8194 2.45946 16.8544 2.88108V3.86486Z"
                fill="#DEDEE0"
              />
            </svg>
          </button>
          <Count amount={amount} setAmount={setAmount} />
        </div>
      </div>
      <div className="cart-item__line"></div>
      <div className="cart-item__price">
        <p className="cart-item__text">Price:</p>
        <p className="cart-item__number">${itemData.price * amount}</p>
      </div>
    </div>
  );
};
