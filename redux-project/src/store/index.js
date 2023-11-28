import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    incrementBy2: (state) => {
      state.value += 2;
    },
    decrementBy2: (state) => {
      state.value -= 2;
    },
  },
});

export const { incremented, decremented, incrementBy2, decrementBy2 } =
  counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
