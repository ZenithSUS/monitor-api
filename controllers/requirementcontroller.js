import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Get all requirements
export const getAllRequirements = async (req, res) => {
  try {
    const limit = req.query.limit;
    const department = req.query.dept;

    const requirementsCollection = query(collection(db, "Requirements"));
    const requirementsSnapshot = await getDocs(requirementsCollection);
    const requirements = requirementsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (!isNaN(limit) && limit > 0) {
      return res.status(200).json(requirements.slice(0, limit));
    }

    if(department) {
      return res.status(200).json(requirements.filter((r) => r.department === department))
    } else {
      return res.status(200).json(requirements);
    }

  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Get requirement by id
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
      return res.status(404).json({
        status: res.statusCode,
        message: "Requirement not found",
      });
    } else {
      return res.status(200).json(requirement);
    }
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Create a new requirement
export const createRequirement = async (req, res) => {
  try {
    const {
      department,
      complianceList,
      frequencyOfCompliance,
      typeOfCompliance,
      personInCharge,
      entity,
      status,
      uploadedFileUrl,
      dateSubmitted,
      expiration,
      documentReference,
    } = req.body;

    console.log(req.body);
    if (
      !department ||
      !complianceList ||
      !frequencyOfCompliance ||
      !typeOfCompliance ||
      !personInCharge ||
      !entity ||
      !status ||
      !uploadedFileUrl ||
      !dateSubmitted ||
      !expiration ||
      !documentReference
    ) {
      return res.status(401).json({
        status: res.statusCode,
        message: "Unprocessable entity",
      });
    }

    const uniqueId = (Math.random() + 1).toString(36).substring(7);
    const requirement = await addDoc(collection(db, "Requirements"), {
      department,
      complianceList,
      frequencyOfCompliance,
      typeOfCompliance,
      personInCharge,
      entity,
      status,
      uploadedFileUrl,
      dateSubmitted,
      expiration,
      renewal: "",
      documentReference,
      id: uniqueId,
    });

    return res.status(201).json({
      status: res.statusCode,
      message: "Requirement created successfully",
      data: requirement,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Update a requirement
export const updateRequirement = async (req, res) => {
  try {
    const requirementId = req.params.id;
    const {
      department,
      complianceList,
      frequencyOfCompliance,
      typeOfCompliance,
      personInCharge,
      entity,
      status,
      uploadedFileUrl,
      dateSubmitted,
      expiration,
      renewal,
      documentReference,
    } = req.body;
    const requirement = await updateDoc(
      doc(db, "Requirements", requirementId),
      {
        department,
        complianceList,
        frequencyOfCompliance,
        typeOfCompliance,
        personInCharge,
        entity,
        status,
        uploadedFileUrl,
        dateSubmitted,
        expiration,
        renewal,
        documentReference,
      }
    );

    if (!requirement) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Requirement not found",
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      message: "Requirement updated successfully",
      data: requirement,
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

// Delete a requirement
export const deleteRequirement = async (req, res) => {
  try {
    const requirementId = req.params.id;
    const requirementsCollection = await getDocs(
      collection(db, "Requirements")
    );
    const requirement = requirementsCollection.docs.find(
      (u) => u.id === requirementId
    );

    if (!requirement) {
      return res.status(404).json({
        status: res.statusCode,
        message: "Requirement not found",
      });
    }

    await deleteDoc(doc(db, "Requirements", requirementId));

    return res.status(200).json({
      status: res.statusCode,
      message: "Requirement deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
