import axios from "axios";
import Router from "next/router";
import { store } from "../app/redux/store";
import { BASE_URL } from "./constants";
import { deleteTokens } from "../app/redux/features/authSlice";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch(deleteTokens());
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      Router.push("/account");
    }
    return error;
  }
);

export default axiosPrivate;
