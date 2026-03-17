import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 🔐 Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get Transactions
export const getTransactions = async (params) => {
  try {
    const res = await API.get("/transactions", {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("Transaction API Error:", error);
    throw error;
  }
};