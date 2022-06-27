import React, { useState, useEffect } from "react";
import "../../styles/buttons.scss";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorites, openModal, setFavoriteId } from "../../store/slices";

// export async function addFavoriteFetch(id, token) {
//   await fetch(`/api/products/${id}/favorite`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

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

  const handleLike = async () => {
    if (!token) {
      dispatch(openModal("continue"));
      dispatch(setFavoriteId(id));
      return;
    }
    if (!isLike) {
      // await addFavoriteFetch(id, token);
      await fetch(`/api/products/${id}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await fetch(`/api/products/${id}/favorite`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeFavorites(id));
    }
    setIsLike(!isLike);
  };

  useEffect(() => {
    // let isMounted = true;
    // if (isMounted) setIsLike(favorite);
    // return () => {
    //   isMounted = false;
    // };

    setIsLike(favorite);

    if (!token) {
      setIsLike(false);
    }

    return () => setIsLike();
  }, [favorite, token]);

  return (
    <button
      className={isLike ? `${className} ${className}-active` : className}
      onClick={handleLike}
    >
      {isLike ? newTitle : title}
    </button>
  );
};
