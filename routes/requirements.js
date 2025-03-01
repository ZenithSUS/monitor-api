// Initialize Express
import express from "express";

// Initialize Router
const router = express.Router();

// Import Controller
import { getAllRequirements, getRequirementById } from "../controllers/requirementcontroller.js";

router.get("/", getAllRequirements);
router.get("/:id", getRequirementById);


export default router;