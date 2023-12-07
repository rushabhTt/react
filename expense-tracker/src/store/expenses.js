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
      if (state.total > 10000) {
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
      if (state.total <= 10000) {
        state.showPremiumButton = false;
      }
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
      state.total = state.expenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      if (state.total > 10000) {
        state.showPremiumButton = true;
      }
    },
    downloadCSV(state) {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        state.expenses
          .map((expense) => Object.values(expense).join(","))
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "expenses.csv");
      document.body.appendChild(link);
      link.click();
    },
  },
});

export const { addExpense, removeExpense, setExpenses, downloadCSV } =
  expensesSlice.actions;

export default expensesSlice;
