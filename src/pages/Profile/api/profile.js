import api from "@/api/apiClient";

// ✅ Get Logged-in User Profile
export const getUserProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};