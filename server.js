import express from "express";
import cors from "cors";
import path from "path";
import users from "./routes/users.js";
import requirments from "./routes/requirements.js";
import admin from "firebase-admin";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/not-found.js";
import { error } from "./middleware/error.js";
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('./monitoring-system-ea001-firebase-adminsdk-fbsvc-0f81077dc7.json', import.meta.url))
);

// Port number
const port = process.env.PORT || 8000;

// Base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// Initialize app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// Routes
app.use("/api/users", users);
app.use("/api/requirements", requirments);

// Error Handlers
app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
