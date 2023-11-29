import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    incremented: (state) => {
      state.counter += 1;
    },
    decremented: (state) => {
      state.counter -= 1;
    },
    increase: (state, action) => {
      state.counter += action.payload;
    },
    decrease: (state, action) => {
      state.counter -= action.payload;
    },
    toggle: (state) => {
      state.showCounter = !state.showCounter;
    },
  },
});

export const { incremented, decremented, increase, decrease, toggle } =
  counterSlice.actions;

export default counterSlice;
