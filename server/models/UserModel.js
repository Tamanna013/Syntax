// Import mongoose to define schema and interact with MongoDB
import mongoose from "mongoose";

// Import genSalt from bcrypt to generate a salt for hashing passwords
// ⚠️ Note: You imported `genSalt`, but used `bcrypt.genSalt()` below, so importing the whole `bcrypt` makes more sense.
// I’ll keep it as-is here and explain below.
import bcrypt from "bcrypt"; // Actually not used directly — consider importing full bcrypt instead

// Define the schema for the 'User' collection in MongoDB
const userSchema = new mongoose.Schema({
    // User's email address
    // - Must be a string
    // - Required field (validation message added)
    // - Must be unique (no duplicate emails)
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    // User's password (will be hashed before saving)
    // - Must be a string
    // - Required field (validation message added)
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    // Optional: User's first name
    firstName: {
        type: String,
        required: false,
    },
    // Optional: User's last name
    lastName: {
        type: String,
        required: false,
    },
    // Optional: User's profile image URL
    image: {
        type: String,
        required: false,
    },
    // Optional: A number representing the user's chosen color/theme/icon
    color: {
        type: Number,
        required: false,
    },
    // Boolean flag indicating whether the user has completed their profile setup
    // - Defaults to false when a new user is created
    profileSetup: {
        type: Boolean,
        default: false,
    },
});

// Mongoose middleware that runs **before saving** a user document to the database
// Purpose: Hash the user's plain-text password using bcrypt for security
userSchema.pre("save", async function (next) {
    // Generate a salt using bcrypt
    const salt = await bcrypt.genSalt();

    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);

    // Continue with the save operation
    next();
});

// Create a Mongoose model named 'User' based on the schema defined above
// This model will be used to interact with the 'users' collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application (e.g., controllers, routes)
export default User;
