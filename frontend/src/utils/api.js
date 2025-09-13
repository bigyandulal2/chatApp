// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // uncomment if you use cookie/session auth
});

export default api;
