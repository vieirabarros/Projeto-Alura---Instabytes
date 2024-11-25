// Import the express library. This is like importing tools for building our web application.
import express from "express";
// Import the defined routes for handling API requests related to posts. Think of these as the different paths/actions available in our app (e.g., creating a post, getting all posts).
import routes from "./src/routes/postsRoutes.js";


// Create an instance of the express application. This is like setting up the foundation of our app.
const app = express(); 

// Serve static files from the "uploads" directory. This allows us to directly access files like images or videos stored in this folder.
app.use(express.static("uploads"))

// Use the imported routes to handle API requests. This connects the defined paths/actions to the main application.
routes(app)


// Set the port number for the server to listen on.  This is like assigning an address to our restaurant.
const port = 3000;

// Start the server and listen for incoming requests on the specified port.  This opens the restaurant for business!
app.listen(port,() =>{
    console.log(`Server listening on port ${port}...`);
});
