import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// 🔁 REFRESH TOKEN
const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");

  const res = await axios.post(
    `${BASE_URL}/auth/refresh`,
    {},
    {
      headers: {
        Authorization: refresh,
      },
    }
  );

  const newAccess = res.data.data.access_token;
  localStorage.setItem("accessToken", newAccess);

  return newAccess;
};

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = newToken;
        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.replace("/login");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;