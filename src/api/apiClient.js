import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  // Only attach token if exists
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {

    // DO NOT redirect to login automatically
    console.log("API Error:", error.response?.data);

    return Promise.reject(error);
  }
);

export default api;