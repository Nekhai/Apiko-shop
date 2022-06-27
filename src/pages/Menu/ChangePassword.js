import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const ChangePassword = () => {
  const [passError, setPassError] = useState(null);
  const token = useSelector((state) => state.login.token);

  const putData = async (data) => {
    try {
      const response = await fetch("/api/account/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: data.currPass,
          password: data.newPass,
        }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Wrong password");
        }
      }
    } catch (error) {
      setPassError(error);
      console.log(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("newPass", "");

  const onSubmit = (data) => {
    putData(data);
    console.log(data);
  };

  return (
    <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("currPass", {
            required: "Enter your password",
          })}
          placeholder="Current password"
          className={errors.currPass && "form__valid-err"}
          type="password"
          id="currPass"
        />
        <label
          htmlFor="currPass"
          className={errors.currPass && "form__label-err"}
        >
          Current password
        </label>
        <p className={"form__message-err"}>{passError?.message}</p>
      </div>
      <div>
        <input
          {...register("newPass", {
            required: "Enter your new password",
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
              message:
                "The password has to be at least at least 1 letter, 1special symbol, 1 number",
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
          placeholder="New password"
          className={errors.newPass && "form__valid-err"}
          type="password"
          id="newPass"
        />
        <label
          htmlFor="newPass"
          className={errors.newPass && "form__label-err"}
        >
          New password
        </label>
        <p className={"form__message-err"}>{errors.newPass?.message}</p>
      </div>
      <div>
        <input
          {...register("confPass", {
            required: "Confirm your new password",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          placeholder="Confirm password"
          className={errors.confPass && "form__valid-err"}
          type="password"
          id="confPass"
        />
        <label
          htmlFor="confPass"
          className={errors.confPass && "form__label-err"}
        >
          Confirm password
        </label>
        <p className={"form__message-err"}>{errors.confPass?.message}</p>
      </div>
      <button className="main-form__submit-btn" type="submit">
        Change password
      </button>
    </form>
  );
};
