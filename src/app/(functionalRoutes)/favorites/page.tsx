"use client";

import Favorites from "@components/Favorites/Favorites";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchFavorites } from "../../redux/features/favoritesSlice";
import { Loading } from "../../../_components/Loading/Loading";

export default function Page() {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const favorites = useAppSelector((state) => state.favorites.list);
  const loading = useAppSelector((state) => state.favorites.loading);

  useEffect(() => {
    loading && <Loading />;
    if (isAuth) {
      const token = localStorage.getItem("accessToken");
      dispatch(fetchFavorites);
    }
  }, [isAuth]);

  return <Favorites favorites={favorites} />;
}
