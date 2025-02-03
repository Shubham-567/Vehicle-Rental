import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const VehicleContext = createContext();

// context provider
export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, , setError] = useState(null);

  const API_URL = "http://localhost:5000/api/vehicles";

  // fetch all vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL);
        setVehicles(response.data.vehicles);
      } catch (err) {
        console.error("Failed to fetch vehicles", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch vehicles. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        error,
      }}>
      {children}
    </VehicleContext.Provider>
  );
};
