import { configureStore } from "@reduxjs/toolkit";
import {
  modalReducer,
  loginReducer,
  passwordReducer,
  itemReducer,
  categoriesReducer,
  settingReducer,
  favoritesReducer,
  cartReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    login: loginReducer,
    password: passwordReducer,
    item: itemReducer,
    categories: categoriesReducer,
    setting: settingReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});
