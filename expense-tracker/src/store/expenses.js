import { createSlice } from "@reduxjs/toolkit";

// ^ intialState ko reducers me change kiya jaata hain based on input given in the different files
const initialExpensesState = {
  expenses: [],
  total: 0,
  showPremiumButton: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.total += action.payload.amount;
      if (state.total > 1000) {
        state.showPremiumButton = true;
      }
    },
    removeExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.total = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      if (state.total <= 1000) {
        state.showPremiumButton = false;
      }
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.total = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      if (state.total > 1000) {
        state.showPremiumButton = true;
      }
    },
  },
});

export const { addExpense, removeExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice;
