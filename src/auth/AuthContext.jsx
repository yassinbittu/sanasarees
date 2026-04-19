import React, { createContext, useContext, useState, useEffect } from 'react'
import api from "../api/apiClient"; // ✅ ADD THIS

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // ✅ Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // ✅ Single login API
  const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    if (data.success) {
      const { access_token, refresh_token, user } = data.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);

      setUser(user);

      return { success: true, role: user.role };
    }

    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: "Server error" };
  }
};

  const logout = () => {
    localStorage.clear()
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}