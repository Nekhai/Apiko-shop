import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./ItemModal.scss";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, countCart, setId } from "../store/slices";
import { SvgClose } from "../components/Image/svgClose";
import { Image } from "../components/Image/Image";
import { ButtonAddToCart } from "../components/buttons/ButtonAddToCart";
import { ButtonAddToFavorites } from "../components/buttons/ButtonAddToFavorites";
import { ButtonBuyNow } from "../components/buttons/ButtonBuyNow";
import { Count } from "../components/buttons/Count";

export const ItemModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modal);
  const token = useSelector((state) => state.login.token);
  const id = useSelector((state) => state.item.id);

  const [itemData, setItemData] = useState(null);
  const [amount, setAmount] = useState(1);

  const clickHandler = () => {
    dispatch(countCart());
    dispatch(closeModal());
    setAmount(1);
    setItemData(null);
    dispatch(setId(null));
  };

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      try {
        const response = await fetch(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();

    return () => {
      setItemData(null);
    };
  }, [token, id]);

  if (!itemData) return <div></div>;

  return (
    modal === "ItemModal" &&
    ReactDOM.createPortal(
      <div className="item">
        <div className="item__wrap">
          <button className="item__close" onClick={clickHandler}>
            <SvgClose />
          </button>
          <div className="item__content">
            <div className="item__img">
              <Image path={itemData.picture} name={itemData.title} />
            </div>
            <div className="item__text">
              <div>
                <div className="item__title">{itemData.title}</div>
                <div className="item__description">{itemData.description}</div>
              </div>
              <div>
                <div className="item__price price">
                  <div className="price__title">Price</div>
                  <div className="price__number">${itemData.price}</div>
                </div>
                <Count amount={amount} setAmount={setAmount} />
                <div className="item__total total">
                  <div className="total__price">
                    <div className="total__title">Items:</div>
                    <div className="total__number">{amount}</div>
                  </div>
                  <div className="total__price">
                    <div className="total__title">Total:</div>
                    <div className="total__number">
                      {amount ? "$" : null}
                      {amount * itemData.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item__btns">
            <div className="item__btns-add">
              <ButtonAddToCart
                title="add to cart"
                id={itemData.id}
                amount={amount}
                setAmount={setAmount}
                price={itemData.price}
                name={itemData.title}
                setItemData={setItemData}
              />
              <ButtonAddToFavorites
                title="add to favorites"
                newTitle={
                  <p>
                    added to favorites
                    <svg
                      width="19"
                      height="13"
                      viewBox="0 0 19 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 1.08765L17.846 0L6.65537 10.7988L1.15395 5.49004L0 6.57769L6.65537 13L19 1.08765Z"
                        fill="white"
                      />
                    </svg>
                  </p>
                }
                id={itemData.id}
                favorite={itemData.favorite}
                className="buttons-orange-border"
              />
            </div>
            <ButtonBuyNow
              title="buy now"
              id={itemData.id}
              amount={amount}
              price={itemData.price}
              name={itemData.title}
            />
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
