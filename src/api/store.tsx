import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState} from "@/api/slices/user"
import { sellerApi } from "./sellerApiCalls";
import { buyerApi } from "./buyerApiCalls";

const store = configureStore({
  reducer: {
    [sellerApi.reducerPath]: sellerApi.reducer,
    [buyerApi.reducerPath]: buyerApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sellerApi.middleware, buyerApi.middleware),
});

export default store;

export interface RootState {
  user: UserState;
}

export type AppDispatch = typeof store.dispatch;
