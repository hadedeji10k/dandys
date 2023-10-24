import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CounterState {
  value: number;
  language: {
    name: string;
    url: string
  }[]
}

const initialState: CounterState = {
  value: 0,
  language: []
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    saveLanguage: (state, action: PayloadAction<{name: string; url: string}[]>) => {
      state.language = action.payload;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, saveLanguage, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
