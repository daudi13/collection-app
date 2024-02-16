import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/users/usersSlice"

export const store = configureStore({
  reducer: {
    users: userReducer,
  }
})