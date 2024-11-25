// Import functions from the postsModel to interact with the database
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
// Import the file system module to work with files
import fs from "fs";
// Import the function to generate descriptions using Gemini
import gerarDescricaoComGemini from "../services/geminiService.js";


// Controller function to list all posts
export async function listarPosts(req, res) {
    // Fetch all posts from the database
    const posts = await getTodosPosts();
    // Send the posts back to the client with a 200 OK status code
    res.status(200).json(posts);
}

// Controller function to create a new post
export async function postarNovoPost(req,res){
    // Get the new post data from the request body
    const novoPost = req.body;
    try {
         // Create the new post in the database
         const postCriado = await criarPost(novoPost);
         // Send the created post back to the client with a 201 Created status code
         res.status(201).json(postCriado);
    }
    catch(erro){
        // Log the error for debugging
        console.error(erro.message);
        // Send an error response to the client with a 500 Internal Server Error status code
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

// Controller function to upload an image
export async function uploadImagem(req,res){
    // Create a new post object with image details from the request
    const novoPost = {
        descricao:"",
        imgUrl: req.file.originalname,
        alt:""
    };
    try {
        // Create a new post in the database with the image details
        const postCriado = await criarPost(novoPost);
        // Rename the uploaded image file with the post ID
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        // Send the created post back to the client
        res.status(201).json(postCriado);
   }
   catch(erro){
       // Log the error for debugging
       console.error(erro.message);
       // Send an error response to the client
       res.status(500).json({"Erro":"Falha na requisição"});
   }
}

// Controller function to update a post
export async function atualizarNovoPost(req,res){
    // Get the post ID from the request parameters
    const id = req.params.id;
    // Construct the image URL
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        // Read the image file from the uploads directory
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        // Generate a description for the image using Gemini
        const descricaoDaImagem = await gerarDescricaoComGemini(imageBuffer);
        // Create an updated post object
        const postAtualizado={
            imgUrl:urlImagem,
            descricao: descricaoDaImagem,
            alt: req.body.alt
        }
         // Update the post in the database
         const postCriado = await atualizarPost(id, postAtualizado);
         // Send the updated post back to the client
         res.status(200).json(postCriado);
    }
    catch(erro){
        // Log the error for debugging
        console.error(erro.message);
        // Send an error response to the client
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}