import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/photos"

const initialState = {
  photos: [],
  isLoading: false,
  error: null
}

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  const res = await axios.get(URL)
  return [...res.data]
})

const photoSlice = createSlice({
  name: "photos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
      state.status = "loading"
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "success"
        state.albums = action.payload
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "error"
        state.error = action.error.message
    })
  }
});

export const selectAllPhotos = state => state.photos.photos
export const getPhotosLoadingStatus = state => state.photos.isLoading
export const getPhotosError = state => state.photos.error
export const getPhotosById = (state, photoId) => state.photos.photos.find(photo => photo.id === photoId)
export default photoSlice.reducer
