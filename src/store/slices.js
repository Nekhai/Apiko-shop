import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modal: false, setting: false },
  reducers: {
    openModal(state, action) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = false;
    },
    openSetting(state, action) {
      state.setting = action.payload;
    },
  },
});

const addedModalSlice = createSlice({
  name: "addedModal",
  initialState: {
    addedName: null,
  },
  reducers: {
    showAddedModal(state, action) {
      state.addedName = action.payload;
    },
    hideAddedModal(state) {
      state.addedName = null;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], total: 0, buyNow: [] },
  reducers: {
    addToCart(state, action) {
      // !state.cart[action.payload.productId]

      const index = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      index === -1
        ? state.cart.push(action.payload)
        : (state.cart[index].quantity += action.payload.quantity);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    changeQuantity(state, action) {
      if (state.buyNow.length) {
        state.buyNow[0].quantity = action.payload.quantity;
      } else {
        const index = state.cart.findIndex(
          (item) => item.productId === action.payload.productId
        );
        state.cart[index].quantity = action.payload.quantity;
      }
    },
    countCart(state) {
      state.total = state.cart.reduce((acc, cur) => acc + cur.quantity, 0);
    },
    resetCart(state) {
      state.cart = [];
      state.total = 0;
    },
    setBuyNow(state, action) {
      state.buyNow = action.payload;
    },
    countBuyNow(state, action) {
      state.buyNow[0].quantity = action.payload;
    },
  },
});

const settingSlice = createSlice({
  name: "setting",
  initialState: { setting: "account" },
  reducers: {
    setSetting(state, action) {
      state.setting = action.payload;
    },
  },
});

const passwordSlice = createSlice({
  name: "password",
  initialState: { password: "password" },
  reducers: {
    togglPassword(state) {
      state.password = state.password === "password" ? "text" : "password";
    },
    hidePassword(state) {
      state.password = "password";
    },
  },
});

const itemSlice = createSlice({
  name: "item",
  initialState: { id: null, orderId: null, orderData: null },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
    setOrderData(state, action) {
      state.orderData = action.payload;
    },
  },
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorites(state, action) {
      state.favorites = action.payload;
    },
    removeFavorites(state, action) {
      const filterState = state.favorites.filter(
        (item) => item.id !== action.payload
      );
      state.favorites = filterState;
    },
  },
});

export const categoriesFetch = createAsyncThunk(
  "categories/categoriesFetch",
  async () => {
    try {
      const response = await fetch("/api/categories");
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  reducers: {
    addCategories(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: {
    [categoriesFetch.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const loginFetch = createAsyncThunk(
  "login/loginFetch",
  async ({ data, url }, { rejectWithValue }) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Such email is already used");
        } else if (response.status === 401) {
          throw new Error("Email or password incorrect");
        }
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: null,
    error: null,
    account: null,
    token: null,
    favoriteId: null,
  },
  reducers: {
    logoutUser(state) {
      state.status = null;
      state.account = null;
      state.token = null;
      state.favoriteId = null;
    },
    updateUser(state, action) {
      state.account = action.payload;
    },
    setFavoriteId(state, action) {
      state.favoriteId = action.payload;
    },
  },

  extraReducers: {
    [loginFetch.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [loginFetch.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.account = action.payload.account;
      state.token = action.payload.token;
    },
    [loginFetch.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { logoutUser, updateUser, setFavoriteId } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const { openModal, closeModal, openSetting } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const { togglPassword, hidePassword } = passwordSlice.actions;
export const passwordReducer = passwordSlice.reducer;

export const { setId, setOrderId, setOrderData } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;

export const { addCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

export const { setSetting } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;

export const { addFavorites, removeFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

export const { showAddedModal, hideAddedModal } = addedModalSlice.actions;
export const addedModalReducer = addedModalSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  countCart,
  resetCart,
  setBuyNow,
  countBuyNow,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
