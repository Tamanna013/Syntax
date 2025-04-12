// Importing required external packages

// Express: A minimalist web framework for Node.js used to build web applications and APIs
import express from "express";

// Dotenv: Loads environment variables from a .env file into process.env
import dotenv from "dotenv";

// CORS: Enables Cross-Origin Resource Sharing to allow requests from other origins
import cors from "cors";

// Cookie-parser: Parses cookies attached to the client request object
import cookieParser from "cookie-parser";

// Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js
import mongoose from "mongoose";

// Import route handlers for authentication (sign up, login, etc.)
import authRoutes from "./routes/AuthRoutes.js";

// Load environment variables from .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Define the port to run the server on (use .env value or default to 3001)
const port = process.env.PORT || 3001;

// Load the MongoDB connection URI from environment variables
const databaseURL = process.env.DATABASE_URL;

// Enable Cross-Origin Resource Sharing with configuration
app.use(cors({ 
    origin: [process.env.ORIGIN || "http://localhost:5173"],  // Allow requests only from this specified frontend origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Permitted HTTP methods
    credentials: true              // Allow cookies and authentication headers in cross-origin requests
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));

// Parse cookies attached to incoming HTTP requests
app.use(cookieParser());

// Parse incoming requests with JSON payloads (application/json)
app.use(express.json());

// Register authentication-related API routes under the /api/auth path
// For example: POST /api/auth/signup, POST /api/auth/login, etc.
app.use("/api/auth", authRoutes);

// Start the server and listen on the specified port
// Log a message once the server is up and running
const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Establish a connection to MongoDB using Mongoose
// Log a success message if connected, or an error message if the connection fails
mongoose.connect(databaseURL)
    .then(() => console.log(`DB Connection Successful.`))
    .catch((err) => console.log(err.message));
