
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: BASE_URL,
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get Orders
export const getOrders = async (params) => {
  const res = await API.get("/orders", { params });
  return res.data;
};