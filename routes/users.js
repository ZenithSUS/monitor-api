// Intialize Express
import express from "express";

// Initialize Router
const router = express.Router();

// Import Controller
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/usercontroller.js";

// Get routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Post routes
router.post("/", createUser);
router.post("/login", loginUser);

// Delete routes
router.delete("/:id", deleteUser);
export default router;
