import axios from "axios";

export const BASE = import.meta.env.VITE_BASE_URL;

export default axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axiosPrivate = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
