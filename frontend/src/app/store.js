import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authentication/authSlice";
import productReducer from "../features/products/productSlice";

export const store = configureStore({
  //later we create user reducer and goal reducer
  reducer: {
    auth:authReducer,
    products:productReducer
  },
});
