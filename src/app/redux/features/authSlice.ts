import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    refreshToken: "",
    accessToken: "",
  },
  reducers: {
    addTokens: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
    },
    deleteTokens: (state) => {
      state.refreshToken = "";
      state.accessToken = "";
      state.isAuth = false;
    },
  },
});

export const { addTokens, deleteTokens } = authSlice.actions;

export default authSlice.reducer;
