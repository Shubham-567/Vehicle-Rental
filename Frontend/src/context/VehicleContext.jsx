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

  // add a new vehicle
  const addVehicle = useCallback(async (vehicleData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, vehicleData, {
        withCredentials: true,
      });
      setVehicles((prevVehicles) => [...prevVehicles, response.data.vehicles]);
    } catch (err) {
      console.error("Failed to add vehicle", err);
      setError(
        err.response?.data?.message ||
          "Failed to add vehicle. Please try again later. "
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // update an existing vehicle
  const updateVehicle = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.put(`${API_URL}/${id}`, updateData, {
        withCredentials: true,
      });
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, ...updatedData } : vehicle
        )
      );
    } catch (err) {
      console.error("Failed to update vehicle", err);
      setError(
        err.response?.data?.message ||
          "Failed to update vehicle. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // delete a vehicle
  const deleteVehicle = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URL}/$id`, { withCredentials: true });
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== id)
      );
    } catch (err) {
      console.error("Failed to delete vehicle", err);
      setError(
        err.response?.data?.message ||
          "Failed to delete vehicle. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        error,
        addVehicle,
        updateVehicle,
        deleteVehicle,
      }}>
      {children}
    </VehicleContext.Provider>
  );
};
