import React, { useEffect, useState } from "react";
import "./Basket.scss";
import "../../styles/buttons.scss";
import { CartItem } from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { ButtonReturnHome } from "../../components/buttons/ButtonReturnHome";
import { ThankModal } from "../../Modals/ThankModal";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input/react-hook-form-input";
import { openModal, resetCart, setBuyNow } from "../../store/slices";

export const Basket = ({ items, total, buyNow }) => {
  // const [preloaded, setPreloaded] = useState({});
  const account = useSelector((state) => state.login.account);
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();

  // dispatch(setBuyNow([]));

  const preloadedValues = {
    fullName: account?.fullName,
    phone: account?.phone,
    country: account?.country,
    city: account?.city,
    address: account?.address,
  };

  // const preloadedValues = preloaded;

  const totalPrice = items.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  const itemsOrder = items.reduce((acc, cur) => {
    acc.push({ productId: cur.productId, quantity: cur.quantity });
    return acc;
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preloadedValues });

  const postOrder = async (orderData) => {
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
  };

  const onSubmit = (data) => {
    dispatch(openModal("thank"));
    postOrder({ items: itemsOrder, shipment: data });
    dispatch(setBuyNow([]));
    if (!buyNow) {
      dispatch(resetCart());
    }
  };

  // useEffect(() => {
  //   setPreloaded({
  //     fullName: account?.fullName,
  //     phone: account?.phone,
  //     country: account?.country,
  //     city: account?.city,
  //     address: account?.address,
  //   });
  // }, [account]);

  return (
    <div className="cart">
      <div className="cart__container">
        <h2 className="cart__title">My cart</h2>
        <div className="cart__content">
          <div className="cart__items">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                id={item.productId}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="cart__line"></div>
          <div className="cart__info">
            <div className="cart__form">
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
                  <p className="main-form__message-err">
                    {errors.fullName?.message}
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
                    {...register("country", {
                      required: "Mandatory info missing",
                    })}
                    placeholder="Country"
                    id="country"
                  />
                  <label htmlFor="country">Country</label>
                </div>
                <div className="main-form__city">
                  <input
                    {...register("city", {
                      required: "Mandatory info missing",
                    })}
                    placeholder="City"
                    id="city"
                  />
                  <label htmlFor="city">City</label>
                </div>
                <div>
                  <input
                    {...register("address", {
                      required: "Mandatory info missing",
                    })}
                    placeholder="Address"
                    id="address"
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="cart__total cart__item">
                  <p className="cart__text">Items</p>
                  <div className="cart__number">{total}</div>
                </div>
                <div className="cart__total">
                  <p className="cart__text">Total</p>
                  <div className="cart__number">$ {totalPrice}</div>
                </div>
                <div className="cart__buttons">
                  <button className="buttons-orange" type="submit">
                    Confirms the purchase
                  </button>
                  <ButtonReturnHome title="Continue shopping" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ThankModal />
    </div>
  );
};
