"use client";

import { useAppDispatch } from "../../app/redux/store";
import { addTokens } from "../../app/redux/features/authSlice";
import { useEffect } from "react";

export default function Auth() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (refreshToken && accessToken) {
      dispatch(
        addTokens({
          refreshToken,
          accessToken,
        })
      );
    }
  }, []);

  return null;
}
