import React, { useEffect, useState } from "react";
import "./Favorites.scss";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../../app/App";
import { ButtonLoadMore } from "../../components/buttons/ButtonLoadMore";
import { AppItem } from "../../app/AppItem";
import { addFavorites } from "../../store/slices";
import { ItemModal } from "../../Modals/ItemModal";

export const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const setting = useSelector((state) => state.setting.setting);

  const [itemLimit, setItemLimit] = useState(20);

  const url = `/api/products/favorites?offset=0&limit=${itemLimit}`;
  const { fetchData } = useFetch(url);

  useEffect(() => {
    dispatch(addFavorites(fetchData));
  }, [fetchData, dispatch]);

  if (!favorites) {
    return <div></div>;
  }

  return setting !== "favorites" ? null : (
    <div className="menu__favorites favorites">
      <div className="favorites__items">
        {favorites.map((item) => (
          <AppItem key={item.id} item={item} />
        ))}
      </div>
      <div className="favorites__more">
        {favorites.length % 20 === 0 && (
          <ButtonLoadMore handler={() => setItemLimit(itemLimit + 20)} />
        )}
      </div>
      <ItemModal />
    </div>
  );
};
