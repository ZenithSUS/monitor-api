import express from "express";
import cors from "cors";
import path from "path";
import users from "./routes/users.js";
import requirments from "./routes/requirements.js";
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/not-found.js";
import { error } from "./middleware/error.js";

// Port number
const port = process.env.PORT || 8000;

// Base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(cors());
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
