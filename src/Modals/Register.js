import React from "react";
import ReactDOM from "react-dom";
import "./form.scss";
import { useSelector, useDispatch } from "react-redux";
import { CloseModalBtn } from "./CloseModalBtn";
import { OpenModalBtn } from "./OpenModalBtn";
import { loginFetch, closeModal, hidePassword } from "../store/slices";
import { useForm } from "react-hook-form";
import { PasswordEye } from "./PasswordEye";
import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const Register = () => {
  const passwordType = useSelector((state) => state.password.password);
  const modal = useSelector((state) => state.modal.modal);
  const login = useSelector((state) => state.login);
  const favotiteId = useSelector((state) => state.favorites.favoriteLoggedOut);
  const dispatch = useDispatch();
  const url = "/api/auth/register";

  const {
    control,
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
    modal === "register" &&
    ReactDOM.createPortal(
      <div className="form">
        <div className="form__wrap">
          <div className="form__content">
            <CloseModalBtn className="form__close" />
            <h2 className="form__title">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  {...register("fullName", {
                    required: "Mandatory info missing",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Cannot have special characters and numbers",
                    },
                  })}
                  placeholder="Full Name"
                  className={errors.fullName && "form__valid-err"}
                  id="fullName"
                />
                <label
                  htmlFor="fullName"
                  className={errors.fullName && "form__label-err"}
                >
                  Full Name
                </label>
                <p className="form__message-err">{errors.fullName?.message}</p>
              </div>
              <div>
                <input
                  {...register("email", {
                    required: "Mandatory info missing",
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
                <p className="form__message-err">
                  {login.error ? login.error : errors.email?.message}
                </p>
              </div>
              <div>
                <PhoneInput
                  name="phone"
                  control={control}
                  placeholder="Phone number"
                  rules={{
                    required: "Mandatory info missing",
                    pattern: {
                      value: /^(\+)?(\d){10,14}$/,
                      message: "Can have '+' and should contain numbers",
                    },
                    maxLength: {
                      value: 14,
                      message: "Max length 14",
                    },
                    minLength: {
                      value: 10,
                      message: "Min length 10",
                    },
                  }}
                />
                <label
                  htmlFor="number"
                  className={errors.phone && "form__label-err"}
                >
                  Phone number
                </label>
                <p className="form__message-err">{errors.phone?.message}</p>
              </div>
              <div>
                <input
                  {...register("password", {
                    required: "Mandatory info missing",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                      message:
                        "The password has to be at least at least 1 letter, 1 special symbol, 1 number",
                    },
                    maxLength: {
                      value: 35,
                      message: "Max length 35",
                    },
                    minLength: {
                      value: 8,
                      message: "Min length 8",
                    },
                  })}
                  type={passwordType}
                  placeholder="Password"
                  className={errors.password && "form__valid-err"}
                  id="Password"
                />
                <label
                  htmlFor="Password"
                  className={errors.password && "form__label-err"}
                >
                  Password
                </label>
                {errors.password ? (
                  <p className={"form__message-err"}>
                    {errors.password?.message}
                  </p>
                ) : (
                  <p className={"form__message-err form__message"}>
                    {
                      "The password has to be at least at least 1 letter, 1special symbol, 1 number"
                    }
                  </p>
                )}
                <PasswordEye />
              </div>
              <button className="form__submit-btn" type="submit">
                Register
              </button>
            </form>
          </div>
          <div className="form__login">
            <p>I already have an account, </p>
            <OpenModalBtn className="form__btn" name="login" title="Log In" />
          </div>
        </div>
      </div>,
      document.getElementById("modal")
    )
  );
};
