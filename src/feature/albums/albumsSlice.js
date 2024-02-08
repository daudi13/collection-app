import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/albums"

const initialState = {
  albums: [],
  status: "idle",
  error: null
}

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  const res = await axios.get(URL)
  return [...res.data]
});

const albumSlice = createSlice({
  name: "albums",
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

export const selectAllAlbums = state => state.albums.albums
export const getAlbumStatus = state => state.albums.status
export const getAlbumError = state => state.albums.error
export const getAlbumsById = (state, albumId) => state.albums.albums.find(album => album.id === albumId)
export default albumSlice.reducer