import { db } from "../firebase.js";
import { collection, getDocs, query } from "firebase/firestore";

export const getAllUsers = async (req, res) => {
  try {
    const usersCollection = query(collection(db, "Users"));
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.status(200).json({
      status: res.statusCode,
      message: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const usersCollection = collection(db, "Users");
    const usersSnapshot = await getDocs(usersCollection);
    const users = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(404).json({
        status: res.statusCode,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        status: res.statusCode,
        message: "Success",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
