import React, { useState } from "react";
import "./MainInformation.scss";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../../store/slices";
import PhoneInput from "react-phone-number-input/react-hook-form-input";

export const MainInformation = () => {
  const login = useSelector((state) => state.login);
  const account = useSelector((state) => state.login.account);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  const preloadedValues = {
    fullName: account.fullName,
    email: account.email,
    phone: account.phone,
    country: account.country,
    city: account.city,
    address: account.address,
  };

  const putData = async (data) => {
    try {
      const response = await fetch("/api/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      dispatch(updateUser(await response.json()));
    } catch (error) {
      console.log(error.message);
    }
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preloadedValues });

  const onSubmit = (data) => {
    putData(data);
  };

  return (
    <form className="main-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("fullName", {
            required: "Mandatory info missing",
            pattern: {
              value: /^[A-Za-zа-яА-Я\s]+$/,
              message: "Cannot have special characters and numbers",
            },
          })}
          placeholder="Full Name"
          className={errors.fullName && "main-form__valid-err"}
          id="fullName"
        />
        <label
          htmlFor="fullName"
          className={errors.fullName && "main-form__label-err"}
        >
          Full Name
        </label>
        <p className="main-form__message-err">{errors.fullName?.message}</p>
      </div>
      <div className="main-form__email">
        <input
          {...register("email", {
            required: "Mandatory info missing",
            pattern: {
              value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
              message: "Should have the correct email format",
            },
          })}
          placeholder="Email"
          className={errors.email && "main-form__valid-err"}
          id="email"
        />
        <label
          htmlFor="email"
          className={errors.email && "main-form__label-err"}
        >
          Email
        </label>
        <p className="main-form__message-err">
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
        <label htmlFor="number" className={errors.phone && "form__label-err"}>
          Phone number
        </label>
        <p className="form__message-err">{errors.phone?.message}</p>
      </div>
      <div>
        <input {...register("country")} placeholder="Country" id="country" />
        <label htmlFor="country">Country</label>
      </div>
      <div className="main-form__city">
        <input {...register("city")} placeholder="City" id="city" />
        <label htmlFor="city">City</label>
      </div>
      <div>
        <input {...register("address")} placeholder="Address" id="address" />
        <label htmlFor="address">Address</label>
      </div>
      <button className="main-form__submit-btn" type="submit">
        Save
      </button>
    </form>
  );
};
