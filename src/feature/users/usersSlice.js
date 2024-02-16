import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users"

const initialState = {
  users: [],
  status: "idle",
  error: null
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(URL)
  return [...res.data]
});

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
      state.status = "loading"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success"
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "error"
        state.error = action.error.message
    })
  }
});

export const selectAllUsers = state => state.users.users
export const getUserStatus = state => state.users.status
export const getUserError = state => state.users.error;
export const getUserById = (state, userId) => state.users.users.find(user => user.id === userId);
export default userSlice.reducer