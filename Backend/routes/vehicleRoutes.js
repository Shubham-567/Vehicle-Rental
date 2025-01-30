import express from "express";
import {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// vehicle routes
router.get("/", getVehicles); // get All Vehicles
router.get("/:id", getVehicleById); // get a specific vehicle by id

// admin only routes for managing vehicles
router.post("/", verifyToken, isAdmin, addVehicle); // add a new vehicle
router.put("/:id", verifyToken, isAdmin, updateVehicle); // update vehicle details
router.delete("/:id", verifyToken, isAdmin, deleteVehicle); // delete vehicle

export default router;
