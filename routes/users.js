// Intialize Express
import express from "express";

// Initialize Router
const router = express.Router();

// Import Controller
import { getAllUsers, getUserById } from "../controllers/usercontroller.js";

// Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;