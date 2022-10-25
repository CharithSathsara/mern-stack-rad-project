import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authentication/authSlice";
import productReducer from "../features/products/productSlice";
import customerReducer from "../features/customers/customerSlice";
import distributorReducer from "../features/distributers/distributerSlice";
import incomeReducer from "../features/incomes/incomeSlice";
import expenditureReducer from "../features/expenditures/expenditureSlice";

export const store = configureStore({

  reducer: {
    auth:authReducer,
    products:productReducer,
    customers:customerReducer,
    distributors:distributorReducer,
    incomes:incomeReducer,
    expenditures:expenditureReducer,
  },
});
