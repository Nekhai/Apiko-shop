import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CloseModalBtn } from "./CloseModalBtn";
import { OpenModalBtn } from "./OpenModalBtn";
import { loginFetch, closeModal, hidePassword } from "../store/slices";
import { PasswordEye } from "./PasswordEye";
import { useForm } from "react-hook-form";

export const Login = () => {
  const passwordType = useSelector((state) => state.password.password);
  const modal = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();
  const url = "/api/auth/login";

  const login = useSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(loginFetch({ data, url }));
    dispatch(closeModal());
    dispatch(hidePassword());
  };

  return (
    modal === "login" &&
    ReactDOM.createPortal(
      <div className="form">
        <div className="form__wrap">
          <div className="form__content">
            <CloseModalBtn className="form__close" />
            <h2 className="form__title">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Should have the correct email format",
                    },
                  })}
                  placeholder="Email"
                  className={errors.email && "form__valid-err"}
                  id="Email"
                />
                <label
                  htmlFor="Email"
                  className={errors.email && "form__label-err"}
                >
                  Email
                </label>
                <p className="form__message-err">{errors.email?.message}</p>
              </div>
              <div>
                <input
                  {...register("password", {
                    required: "Enter your password",
                  })}
                  placeholder="Password"
                  className={errors.password && "form__valid-err"}
                  type={passwordType}
                  id="Password"
                />
                <label
                  htmlFor="Password"
                  className={errors.password && "form__label-err"}
                >
                  Password
                </label>
                <p className={"form__message-err"}>
                  {login.error ? login.error : errors.password?.message}
                </p>
                <PasswordEye />
              </div>
              <Link to="/reset-password" className="form__reset">
                Don’t remember password?
              </Link>
              <button className="form__submit-btn" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="form__login">
            <p>I have no account, </p>
            <OpenModalBtn
              className="form__btn"
              name="register"
              title="Register now"
            />
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
