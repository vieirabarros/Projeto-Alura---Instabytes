// Importa o módulo Express, usado para criar e gerenciar um servidor web.
import express from "express";
import multer from "multer";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita a interpretação de dados JSON nas requisições
    app.use(express.json());
    app.use(cors(corsOptions))
    // Cria um endpoint GET na rota "/posts" para buscar todos os posts.
    app.get("/posts", listarPosts);
    //Rota para criar um post
    app.post("/posts", postarNovoPost);  
    app.post("/uploads", upload.single("imagem"), uploadImagem);
    app.put("/uploads/:id", atualizarNovoPost);
}


export default routes;
