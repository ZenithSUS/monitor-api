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
  updateRequirementRenewal,
  updateRequirementReference,
} from "../controllers/requirementcontroller.js";

// Get routes
router.get("/", getAllRequirements);
router.get("/:id", getRequirementById);

// Post routes
router.post("/", createRequirement);

// Put routes
router.put("/:id", updateRequirement);
router.put("/renewal/:id", updateRequirementRenewal);
router.put("/reference/:id", updateRequirementReference);

// Delete routes
router.delete("/:id", deleteRequirement);

export default router;
