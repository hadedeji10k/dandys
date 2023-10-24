import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState} from "@/api/slices/user"

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

export interface RootState {
  counter: CounterState;
}

export type AppDispatch = typeof store.dispatch;
