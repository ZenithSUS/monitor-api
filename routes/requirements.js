// Initialize Express
import express from "express";

// Initialize Router
const router = express.Router();

// Import Controller
import {
  getAllRequirements,
  getRequirementById,
  createRequirement,
  deleteRequirement,
  updateRequirement,
} from "../controllers/requirementcontroller.js";

// Get routes
router.get("/", getAllRequirements);
router.get("/:id", getRequirementById);

// Post routes
router.post("/", createRequirement);

// Put routes
router.put("/:id", updateRequirement);

// Delete routes
router.delete("/:id", deleteRequirement);


export default router;
