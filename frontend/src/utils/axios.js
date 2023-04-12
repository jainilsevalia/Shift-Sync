import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
});
