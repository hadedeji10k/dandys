import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState} from "@/api/slices/user"
import { sellerApi } from "./sellerApiCalls";

const store = configureStore({
  reducer: {
    [sellerApi.reducerPath]: sellerApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sellerApi.middleware),
});

export default store;

export interface RootState {
  user: UserState;
}

export type AppDispatch = typeof store.dispatch;
