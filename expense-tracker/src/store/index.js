import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// * Slice ek Redux Toolkit ka concept hai jo reducer, actions, aur initialState ko combine karta hai.
import expensesSlice from "./expenses";
import authSlice from "./auth";
import themeSlice from "./theme";

const rootReducer = combineReducers({
  expenses: expensesSlice.reducer,
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  // ! thunk is for async
  middleware: [thunk],
});

export default store;
