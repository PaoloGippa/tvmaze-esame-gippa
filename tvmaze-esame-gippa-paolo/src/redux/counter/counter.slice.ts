import { createSlice } from "@reduxjs/toolkit";

export type CounterStateType = {
  value: number;
};

const initialState: CounterStateType = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      //increment è una funzione//
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
