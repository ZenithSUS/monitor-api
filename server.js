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
import './cronJobs.js';

// Port number
const port = process.env.PORT || 8000;

// Base directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

admin.initializeApp({
  credential: admin.credential.cert({
  "type": process.env.SERVICE_TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN
})
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

// Route to handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use("/api/users", users);
app.use("/api/requirements", requirments);

// Error Handlers
app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
