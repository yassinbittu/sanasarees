import axios from "axios";

const BASE_URL = "https://sana-backend-fim0.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = token; // ✅ no Bearer
  }

  return config;
});

// 🔁 REFRESH TOKEN FUNCTION
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

// ✅ RESPONSE INTERCEPTOR (handle 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        // attach new token
        originalRequest.headers.Authorization = newToken;

        return api(originalRequest); // 🔁 retry request
      } catch (err) {
        // logout if refresh fails
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;