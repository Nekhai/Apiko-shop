import React from "react";
import { Basket } from "./Basket";
import { useSelector, useDispatch } from "react-redux";
// import { setBuyNow } from "../../store/slices";

export const Cart = () => {
  const buyNowItem = useSelector((state) => state.cart.buyNow);
  const basketItems = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);
  // const dispatch = useDispatch();

  // dispatch(setBuyNow([]));

  return (
    <div>
      {!basketItems.length && !buyNowItem.length ? (
        <div className="cart__empty">Cart is Empty</div>
      ) : (
        <Basket
          items={buyNowItem.length ? buyNowItem : basketItems}
          total={buyNowItem.length ? buyNowItem[0].quantity : total}
          buyNow={buyNowItem.length ? true : false}
        />
      )}
    </div>
  );
};
