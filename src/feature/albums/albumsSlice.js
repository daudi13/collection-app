import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/albums"

const initialState = {
  albums: [],
  isLoading: false,
  error: null
}

export const fetchAlbums = createAsyncThunk("albums/fetchAlbums", async () => {
  const res = await axios.get(URL)
  return [...res.data]
});

const albumSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: {
    [fetchAlbums.pending]: (state) => {
      state.isLoading = true
    },
    [fetchAlbums.fulfilled]: (state, action) => {
      state.isLoading = false
      state.albums = action.payload
    },
    [fetchAlbums.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    }
  }
});

export const selectAllAlbums = state => state.albums.albums
export const getAlbumLoadingStatus = state => state.albums.isLoading
export const getAlbumError = state => state.albums.error
export const getAlbumsById = (state, albumId) => state.albums.albums.find(album => album.id === albumId)
export default albumSlice.reducer