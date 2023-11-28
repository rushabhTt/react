import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { counter: 0 },
  reducers: {
    incremented: (state) => {
      state.counter += 1;
    },
    decremented: (state) => {
      state.counter -= 1;
    },
    incrementBy5: (state) => {
      state.counter += 5;
    },
    decrementBy5: (state) => {
      state.counter -= 5;
    },
  },
});

export const { incremented, decremented, incrementBy2, decrementBy2 } =
  counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
