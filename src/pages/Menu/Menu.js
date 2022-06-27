import React from "react";
import "./Menu.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSetting } from "../../store/slices";
import { Favorites } from "./Favorites";
import { Account } from "./Account";
import { Orders } from "./Orders";

export const Menu = () => {
  const login = useSelector((state) => state.login);
  const setting = useSelector((state) => state.setting.setting);
  const dispatch = useDispatch();

  if (!login.account) {
    return <div className="menu__logged-out">Please login</div>;
  }

  const fullName = login.account.fullName;
  const initsials = fullName.split(" ").map((item) => item[0].toUpperCase());

  const classAdd = (name) => {
    return setting === name ? "menu__section-active" : null;
  };

  const handleSetting = (e) => {
    dispatch(setSetting(e.target.name));
  };

  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__name">
          <div className="menu__initsials">{initsials}</div>
          <div className="menu__full-name">{fullName}</div>
        </div>
        <div className="menu__sections">
          <div
            className={`menu__section menu__section-left ${classAdd(
              "account"
            )}`}
          >
            <button
              className="menu__section-btn"
              name="account"
              onClick={handleSetting}
            >
              Edit Account
            </button>
          </div>
          <div className={`menu__section ${classAdd("orders")}`}>
            <button
              className="menu__section-btn"
              name="orders"
              onClick={handleSetting}
            >
              Orders History
            </button>
          </div>
          <div className={`menu__section ${classAdd("favorites")}`}>
            <button
              className="menu__section-btn menu__section-right"
              name="favorites"
              onClick={handleSetting}
            >
              Favourites
            </button>
          </div>
        </div>
        <div className="menu__content">
          <Account />
          <Orders />
          <Favorites />
        </div>
      </div>
    </div>
  );
};
