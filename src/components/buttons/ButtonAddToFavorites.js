import React, { useState, useEffect } from "react";
import "../../styles/buttons.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorites } from "../../store/slices";

export const ButtonAddToFavorites = ({
  title,
  newTitle = title,
  id,
  favorite,
  className,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [isLike, setIsLike] = useState(favorite);

  const handleLike = async (likeId) => {
    if (!isLike) {
      await fetch(`/api/products/${likeId}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await fetch(`/api/products/${likeId}/favorite`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeFavorites(likeId));
    }
    setIsLike(!isLike);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) setIsLike(favorite);
    return () => {
      isMounted = false;
    };
  }, [favorite]);

  return (
    <button
      className={isLike ? `${className} ${className}-active` : className}
      onClick={() => handleLike(id)}
    >
      {isLike ? newTitle : title}
    </button>
  );
};
