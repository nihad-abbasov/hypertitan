import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("/wishlists/list");
      const fetchedFavs = response.data?.map((fav) => fav.product);
      return fetchedFavs;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    list: [],
    error: false,
    loading: false,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const index = state.list.findIndex((p) => p.id === productId);
      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push({ id: productId });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.loading = true;
      state.list = [];
      state.error = null;
    }),
      builder.addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = true;
      }),
      builder.addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = false;
      });
  },
});

export const selectIsFavorite = (state, productId) =>
  state.favorites.list.some(product => product.id === productId);

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
