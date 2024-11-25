// Import necessary modules (like importing ingredients for a recipe)
import express from "express"; // Framework for building web applications
import multer from "multer"; // Middleware for handling file uploads
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js"; // Import functions from the posts controller
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing

// Configure CORS (allows communication between different domains/ports, like ordering ingredients from another store)
const corsOptions = {
    origin: "http://localhost:8000", // Allow requests from this origin (your frontend)
    optionsSuccessStatus: 200 // Return this status code for successful preflight requests
}

// Configure multer for file storage (like specifying how to store ingredients)
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Define where to save the uploaded files
        cb(null, 'uploads/'); // Save files in the 'uploads' directory
    },
    filename: function (req, file, cb) { // Define how to name the uploaded files
        cb(null, file.originalname); // Use the original filename
    }
})


const upload = multer({ dest: "./uploads" , storage}) // Initialize multer with the storage settings

// Define API routes (like defining the steps of your recipe)
const routes = (app) => {
    app.use(express.json()); // Enable parsing of JSON data in requests (like understanding the order from the waiter)
    app.use(cors(corsOptions)) // Enable CORS for all routes
    app.get("/posts", listarPosts); // Handle GET requests to /posts (like retrieving all available dishes)
    app.post("/posts", postarNovoPost); // Handle POST requests to /posts (like placing a new order)
    app.post("/uploads", upload.single("imagem"), uploadImagem); // Handle POST requests to /uploads for image uploads (like sending a picture of a custom cake)
    app.put("/uploads/:id", atualizarNovoPost);  // Handle PUT requests to /uploads/:id to update a post (like modifying an existing order)
}

// Export the routes (so other parts of the application can use them)
export default routes;