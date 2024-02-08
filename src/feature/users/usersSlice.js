import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users"

const initialState = {
  users: [],
  isloading: false,
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
      .addCase(fetchAlbums.pending, (state) => {
      state.status = "loading"
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "success"
        state.albums = action.payload
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "error"
        state.error = action.error.message
    })
  }
});

export const selectAllUsers = state => state.users.users
export const getUserLoadingStatus = state => state.users.isloading
export const getUserError = state => state.users.error;
export const getUserById = (state, userId) => state.users.users.find(user => user.id === userId);
export default userSlice.reducer