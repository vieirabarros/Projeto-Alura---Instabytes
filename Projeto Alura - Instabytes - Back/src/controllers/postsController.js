import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";



export async function listarPosts(req, res) {
    // Obtém todos os posts de forma assíncrona chamando a função getTodosPosts().
    const posts = await getTodosPosts();
    // Retorna os posts obtidos em formato JSON com o status HTTP 200 (sucesso).
    res.status(200).json(posts);
}

export async function postarNovoPost(req,res){
    const novoPost = req.body;
    try {
         const postCriado = await criarPost(novoPost);
         res.status(201).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}

export async function uploadImagem(req,res){
    const novoPost = {
        descricao:"",
        imgUrl: req.file.originalname,
        alt:""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(201).json(postCriado);
   }
   catch(erro){
       console.error(erro.message);
       res.status(500).json({"Erro":"Falha na requisição"});
   }
}

export async function atualizarNovoPost(req,res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricaoDaImagem = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado={
            imgUrl:urlImagem,
            descricao: descricaoDaImagem,
            alt: req.body.alt
        }
         const postCriado = await atualizarPost(id, postAtualizado);
         res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }

}
