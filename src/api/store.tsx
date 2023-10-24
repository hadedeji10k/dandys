import { configureStore } from "@reduxjs/toolkit";
import counterReducer, { CounterState} from "@/api/slices/user"
import { api } from "./apiCalls";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export interface RootState {
  counter: CounterState;
}

export type AppDispatch = typeof store.dispatch;
