import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// context for authentication
export const AuthContext = createContext();

// context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // for user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // check if there's saved user session from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedUser && storedAuthToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // handle use login

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);

      // to do: handle error.... show message to user
    }
  };

  // handle user logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  // provide the context to the app
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
