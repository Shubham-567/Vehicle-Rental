import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Context for authentication
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if there's a saved user session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);

        // Check if token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          logout(); // Token expired
        } else {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        logout(); // Invalid token
      }
    }

    setLoading(false);
  }, []);

  // Handle user login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // Store authentication details
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Login failed", err);

      if (err.code === "ERR_NETWORK") {
        setError(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
      } else if (err.response) {
        setError(err.response.data?.message || "Invalid credentials.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
