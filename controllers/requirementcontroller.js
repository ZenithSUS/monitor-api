import { db } from "../firebase.js";
import { collection, getDocs, query } from "firebase/firestore";

export const getAllRequirements = async (req, res) => {
  try {
    const requirementsCollection = query(collection(db, "Requirements"));
    const requirementsSnapshot = await getDocs(requirementsCollection);
    const requirements = requirementsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    res.status(200).json({
      status: res.statusCode,
      message: "Success",
      data: requirements,
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const getRequirementById = async (req, res) => {
  try {
    const requirementsCollection = collection(db, "Requirements");
    const requirementsSnapshot = await getDocs(requirementsCollection);
    const requirements = requirementsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const requirement = requirements.find((u) => u.id === req.params.id);
    if (!requirement) {
      res.status(404).json({
        status: res.statusCode,
        message: "Requirement not found",
      });
    } else {
      res.status(200).json({
        status: res.statusCode,
        message: "Success",
        data: requirement,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
