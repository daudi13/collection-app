import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/users/usersSlice"
import albumReucer from "../feature/albums/albumsSlice"
import photoReducer from "../feature/photos/photosSlice"

export const store = configureStore({
  reducer: {
    users: userReducer,
    albums: albumReucer,
    photo: photoReducer
  }
})