// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "monitoring-system-ea001.firebaseapp.com",
  projectId: "monitoring-system-ea001",
  storageBucket: "monitoring-system-ea001.firebasestorage.app",
  messagingSenderId: "6855438037",
  appId: "1:6855438037:web:4f83ca39d035dfae5dbc5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
