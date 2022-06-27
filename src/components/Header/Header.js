import React from "react";
import "./Header.scss";
import logo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoggedOut } from "./LoggedOut";
import { LoggedIn } from "./LoggedIn";
import { useSelector, useDispatch } from "react-redux";
import { AddedItemModal } from "../../Modals/AddedItemModal";
import { setSetting } from "../../store/slices";

export const Header = () => {
  const login = useSelector((state) => state.login);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigate = () => {
    dispatch(setSetting("favorites"));
    navigate("/menu");
  };

  return (
    <div className="header">
      <div className="header__wrap">
        <Link to="/" className="header__logo">
          <img src={logo} alt="apiko logo" />
        </Link>
        <div className="header__content">
          <div className="header__links">
            <button onClick={handleNavigate} className="header__favourites">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3944 1.68343C14.3737 -0.438428 11.1524 -0.555219 9 1.33751C6.84849 -0.554327 3.62717 -0.438428 1.60557 1.68343C0.569717 2.7711 0 4.21628 0 5.75507C0 7.29386 0.569717 8.73993 1.60557 9.82671L8.03972 16.5828C8.30462 16.8609 8.65274 17 9 17C9.34726 17 9.69538 16.8609 9.96028 16.5828L16.3944 9.82671C17.4303 8.73993 18 7.29475 18 5.75507C18 4.21628 17.4303 2.77021 16.3944 1.68343Z"
                  fill="white"
                />
              </svg>
            </button>
            <Link to="/cart" className="header__basket">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.4 14.4C4.41 14.4 3.609 15.21 3.609 16.2C3.609 17.19 4.41 18 5.4 18C6.39 18 7.2 17.19 7.2 16.2C7.2 15.21 6.39 14.4 5.4 14.4ZM0 0V1.8H1.8L5.04 8.631L3.825 10.836C3.681 11.088 3.6 11.385 3.6 11.7C3.6 12.69 4.41 13.5 5.4 13.5H16.2V11.7H5.778C5.652 11.7 5.553 11.601 5.553 11.475L5.58 11.367L6.39 9.9H13.095C13.77 9.9 14.364 9.531 14.67 8.973L17.892 3.132C17.964 3.006 18 2.853 18 2.7C18 2.205 17.595 1.8 17.1 1.8H3.789L2.943 0H0ZM14.4 14.4C13.41 14.4 12.609 15.21 12.609 16.2C12.609 17.19 13.41 18 14.4 18C15.39 18 16.2 17.19 16.2 16.2C16.2 15.21 15.39 14.4 14.4 14.4Z"
                  fill="white"
                />
              </svg>
              {total > 0 && <div className="header__total">{total}</div>}
            </Link>
          </div>
          <div>
            {login.status === "resolved" ? <LoggedIn /> : <LoggedOut />}
          </div>
        </div>
      </div>
      <AddedItemModal />
    </div>
  );
};
