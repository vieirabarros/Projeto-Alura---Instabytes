// Importa o módulo Express, usado para criar e gerenciar um servidor web.
import express from "express";
import multer from "multer";
import { listarPosts,postarNovoPost, uploadImagem } from "../controllers/postsController.js";

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
    // Cria um endpoint GET na rota "/posts" para buscar todos os posts.
    app.get("/posts", listarPosts);
    //Rota para criar um post
    app.post("/posts",postarNovoPost);  
    app.post("/upload", upload.single("imagem"), uploadImagem);
}



export default routes;


/*

// Define uma função para buscar o índice de um post específico no array de posts.
// A função recebe um ID como argumento e retorna o índice do post correspondente.
function buscarPostPorID(id) { 
    // Procura o índice do post cujo ID corresponde ao ID fornecido.
    return posts.findIndex((post) => { 
        return post.id === Number(id); // Compara o ID do post convertido em número com o ID fornecido.
    });
}

// Cria um endpoint GET na rota "/posts/:id" para buscar um post específico pelo ID.
app.get("/posts/:id", (req, res) => {
    // Chama a função buscarPostPorID() para obter o índice do post com base no ID fornecido na URL.
    const index = buscarPostPorID(req.params.id);
    // Retorna o post correspondente ao índice em formato JSON com o status HTTP 200 (sucesso).
    res.status(200).json(posts[index]);
});

*/
