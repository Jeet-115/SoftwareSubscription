import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [adminKey, setAdminKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load current user", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = (data) => {
    const accessToken = data.token;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setToken(accessToken);
    }
    setUser(data.user || null);
    // Store admin key from login response (only present for master users)
    setAdminKey(data.adminKey || null);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    }
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
    setAdminKey(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, adminKey, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


