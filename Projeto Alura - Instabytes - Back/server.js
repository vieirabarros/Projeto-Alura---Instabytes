import express from "express";

//Criação do servidor
const app = express(); 

app.listen(3000,() =>{
    console.log("Servidor escutando...");
});

//busca em uma "rota", faz uma "requisição" e recebe uma "resposta"
app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à imersão!");
}); 