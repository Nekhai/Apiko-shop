import React, { useState, useEffect } from "react";
import "./AppItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setId, removeFavorites } from "../store/slices";
import { ButtonAddToFavorites } from "../components/buttons/ButtonAddToFavorites";

export const AppItem = ({ title, price, img, id, favorite }) => {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.login.token);
  // const [isLike, setIsLike] = useState(favorite);

  const handleClick = (itemId) => {
    dispatch(setId(itemId));
    dispatch(openModal("ItemModal"));
  };

  // const handleLike = async (likeId) => {
  //   if (!isLike) {
  //     await fetch(`/api/products/${likeId}/favorite`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   } else {
  //     await fetch(`/api/products/${likeId}/favorite`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     dispatch(removeFavorites(id));
  //   }
  //   setIsLike(!isLike);
  // };

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) setIsLike(favorite);
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [favorite]);

  return (
    <div className="app-item">
      <div className="app-item__img" onClick={() => handleClick(id)}>
        {img}
      </div>
      <h3 className="app-item__title" onClick={() => handleClick(id)}>
        {title}
      </h3>
      <div className="app-item__price">$ {price}</div>
      <div className="app-item__like">
        <ButtonAddToFavorites
          title={
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.3944 2.68343C15.3737 0.561572 12.1524 0.444781 10 2.33751C7.84849 0.445673 4.62717 0.561572 2.60557 2.68343C1.56972 3.7711 1 5.21628 1 6.75507C1 8.29386 1.56972 9.73993 2.60557 10.8267L9.03972 17.5828C9.30462 17.8609 9.65274 18 10 18C10.3473 18 10.6954 17.8609 10.9603 17.5828L17.3944 10.8267C18.4303 9.73993 19 8.29475 19 6.75507C19 5.21628 18.4303 3.77021 17.3944 2.68343Z"
                stroke="#707070"
              />
            </svg>
          }
          id={id}
          favorite={favorite}
          className="app-item__btn"
        ></ButtonAddToFavorites>
        {/* <button
          className={
            isLike ? "app-item__btn app-item__btn-active" : "app-item__btn"
          }
          onClick={() => handleLike(id)}
        >
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.3944 2.68343C15.3737 0.561572 12.1524 0.444781 10 2.33751C7.84849 0.445673 4.62717 0.561572 2.60557 2.68343C1.56972 3.7711 1 5.21628 1 6.75507C1 8.29386 1.56972 9.73993 2.60557 10.8267L9.03972 17.5828C9.30462 17.8609 9.65274 18 10 18C10.3473 18 10.6954 17.8609 10.9603 17.5828L17.3944 10.8267C18.4303 9.73993 19 8.29475 19 6.75507C19 5.21628 18.4303 3.77021 17.3944 2.68343Z"
              stroke="#707070"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
};
