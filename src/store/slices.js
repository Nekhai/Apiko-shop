import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { modal: false },
  reducers: {
    openModal(state, action) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = false;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], total: 0 },
  reducers: {
    addToCart(state, action) {
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
      const index = state.cart.findIndex(
        (item) => item.productId === action.payload.productId
      );
      state.cart[index].quantity = action.payload.quantity;
    },
    countCart(state) {
      state.total = state.cart.reduce((acc, cur) => acc + cur.quantity, 0);
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
  initialState: { id: null },
  reducers: {
    setId(state, action) {
      state.item = action.payload;
    },
  },
});

// export const favoritesFetch = createAsyncThunk(
//   "favorites/favoritesFetch",
//   async ({ url, token }) => {
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

// return await response.json();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { favorites: [] },
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
  // extraReducers: {
  //   [favoritesFetch.pending]: (state) => {
  //     console.log("panding");
  //   },
  //   [favoritesFetch.fulfilled]: (state, action) => {
  //     state.favorites = action.payload;
  //   },
  //   [favoritesFetch.rejected]: (state) => {
  //     console.log("rejected");
  //   },
  // },
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
  },
  reducers: {
    logoutUser(state) {
      state.status = null;
      state.account = null;
      state.token = null;
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

export const { logoutUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const { togglPassword, hidePassword } = passwordSlice.actions;
export const passwordReducer = passwordSlice.reducer;

export const { setId } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;

export const { addCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;

export const { setSetting } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;

export const { addFavorites, removeFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;

export const { addToCart, removeFromCart, changeQuantity, countCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
