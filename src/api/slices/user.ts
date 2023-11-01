import { IUser } from "@/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: number;
  user: IUser;
  notifications: any,
  numberOfUnreadNotifications: number,
  notificationPagination: any,
}

const initialState: UserState = {
  value: 0,
  user: {} as IUser,
  notifications: [],
  numberOfUnreadNotifications: 0,
  notificationPagination: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    saveNotification: (state, action: PayloadAction<any>) => {
      state.notifications = action.payload?.results;
      state.numberOfUnreadNotifications = action.payload?.totalUnreadCount;
      state.notificationPagination = {
        currentPage: action.payload?.currentPage,
        hasNext: action.payload?.hasNext,
        hasPrevious: action.payload?.hasPrevious,
        pageSize: action.payload?.pageSize,
        totalCount: action.payload?.totalCount,
        totalPages: action.payload?.totalPages,
      };
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementByAmount, saveUser, saveNotification } = userSlice.actions;

export default userSlice.reducer;
