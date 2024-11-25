// Import necessary modules.  dotenv/config loads environment variables, ObjectId helps work with MongoDB IDs, and dbConfig handles database connection.
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Establish a connection to the database. Think of it like opening the fridge before cooking.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)


// Function to fetch all posts. Like getting all the ingredients for a dish.
export async function getTodosPosts() {
    // Access the "imersao-alura" database, like selecting a specific cookbook.
    const db =  conexao.db("imersao-alura")
    // Select the "posts" collection, like choosing a recipe from the cookbook.
    const colecao = db.collection("posts")
    // Retrieve all documents (posts) from the collection. Like listing all the ingredients for the recipe.
    return colecao.find().toArray()
}


// Function to create a new post.  Like adding a new recipe to the cookbook.
export async function criarPost(novoPost) {
    // Access the database and collection, similar to before.
    const db =  conexao.db("imersao-alura")
    const colecao = db.collection("posts")
    // Insert the new post into the collection. Like adding the new recipe to the cookbook.
    return colecao.insertOne(novoPost)
}


// Function to update an existing post. Like revising an existing recipe in the cookbook.
export async function atualizarPost(id, novoPost) {
    const db =  conexao.db("imersao-alura");
    const colecao = db.collection("posts");
    // Convert the string ID to a MongoDB ObjectId.  Think of it like finding the correct recipe page number.
    const objID = ObjectId.createFromHexString(id);
    // Update the post matching the given ID with the new data. Like changing the ingredients or instructions on that recipe page.
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}