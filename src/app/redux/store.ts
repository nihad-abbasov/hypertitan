import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import authSlice from "./features/authSlice";
import favoritesSlice from "./features/favoritesSlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    favorites: favoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
