import { createContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      if (token) {
        try {
          const currentUser = await fetchCurrentUser(token);
          setUser(currentUser);
        } catch (err) {
          console.error("Failed to fetch user", err);
          setToken(null);
          localStorage.removeItem("accessToken");
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, [token]);

  const login = (token, user) => {
    setToken(token);
    localStorage.setItem("accessToken", token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
