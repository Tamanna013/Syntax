// Import the User model to interact with the MongoDB 'users' collection
import User from "../models/UserModel.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing and comparison

// Import the 'sign' method from jsonwebtoken to generate JWTs (JSON Web Tokens)
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs"; // Import renameSync to rename files (if needed)

// Define the token's maximum age (in milliseconds)
// This represents 3 days: 3 * 24 hours * 60 minutes * 60 seconds * 1000 ms
const maxAge = 3 * 24 * 60 * 60 * 1000;

// Helper function to create a JWT using user's email and ID
// Payload: { email, userID }
// Secret: process.env.JWT_KEY (should be set securely in .env file)
// Expiry: as defined by maxAge above
const createToken = (email, userID) => {
    return jwt.sign({ email, userID }, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
};

// Controller function to handle user registration/signup
// Route: Typically POST /signup
export const signUp = async (request, response) => {
    try {
        // Extract email and password from the request body
        const { email, password } = request.body;

        // Basic input validation: Check if both fields are present
        if (!email || !password) {
            return response.status(400).send("Both email and password are required");
        }

        // Create a new user document in MongoDB (password will be hashed via Mongoose middleware)
        const user = await User.create({ email, password });

        // Generate a JWT and set it in a cookie
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,           // Duration the cookie should last
            secure: true,     // Ensures the cookie is sent over HTTPS only
            sameSite: "none", // Allows cross-site cookie usage (e.g., frontend hosted separately)
        });

        // Send back a success response with selected user details
        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const login = async (request, response) => {
    try {
        // Extract email and password from the request body
        const { email, password } = request.body;

        // Basic input validation: Check if both fields are present
        if (!email || !password) {
            return response.status(400).send("Both email and password are required");
        }

        // Create a new user document in MongoDB (password will be hashed via Mongoose middleware)
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(401).send("User not found");
        }
        const auth=await bcrypt.compare(password, user.password);

        if (!auth) {
            return response.status(401).send("Invalid credentials");
        }

        // Generate a JWT and set it in a cookie
        response.cookie("jwt", createToken(email, user.id), {
            maxAge,           // Duration the cookie should last
            secure: true,     // Ensures the cookie is sent over HTTPS only
            sameSite: "none", // Allows cross-site cookie usage (e.g., frontend hosted separately)
        });

        // Send back a success response with selected user details
        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup,
                image: user.image,
                firstName: user.firstName,
                lastName: user.lastName,
                color: user.color
            }
        });
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const getUserInfo = async (request, response) => {
    try{
        const userData=await User.findById(request.userID);
        if(!userData) return response.status(404).send("User not found");
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            image: userData.image,
            firstName: userData.firstName,
            lastName: userData.lastName,
            color: userData.color
        });
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const updateProfile = async (request, response) => {
    try{
        const {userID} = request;
        const {firstName, lastName, color} = request.body;
        if(!firstName || !lastName) return response.status(400).send("Please fill all the fields to proceed");
        const userData=await User.findByIdAndUpdate(userID, {
            firstName,
            lastName,
            color,
            profileSetup: true
        }, {new:true, runValidators:true});
        return response.status(200).json({
            id: userData.id,
            email: userData.email,
            profileSetup: userData.profileSetup,
            image: userData.image,
            firstName: userData.firstName,
            lastName: userData.lastName,
            color: userData.color
        });
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const addProfileImage = async (request, response, next) => {
    try{
        if(!request.file){
            return response.status(400).send("File is required");
        }
        const date=Date.now();
        let fileName="uploads/profiles/"+date+request.file.originalname;
        renameSync(request.file.path, fileName);

        const updatedUser=await User.findByIdAndUpdate(request.userID, {image: fileName}, {new: true, runValidators:true});

        return response.status(200).json({
            image: updatedUser.image,
        });
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const removeProfileImage = async (request, response) => {
    try{
        const {userID} = request;
        const user= await User.findById(userID);
        if(!user) return response.status(404).send("User not found");
        if(user.image){
            unlinkSync(user.image);
        }
        user.image=null;
        await user.save();
        
        return response.status(200).send("Image removed successfully");
    } catch (err) {
        // Log any unexpected error and send a generic server error response
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};

export const logout = async (request, response, next) => {
    try{
        response.cookie("jwt", "", {maxAge: 1, secure: true, sameSite: "none"});
        response.status(200).send("Logged out successfully");
    } catch (err) {
        console.log(err.message);
        return response.status(500).send("Internal Server Error", err.message);
    }
};