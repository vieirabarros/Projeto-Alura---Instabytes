import express from "express";
import routes from "./src/routes/postsRoutes.js";


// Cria uma instância do servidor Express
const app = express(); 
routes(app)


// Define a porta em que o servidor irá ouvir
const port = 3000;

// Inicia o servidor e exibe uma mensagem no console quando estiver ouvindo na porta especificada
app.listen(port,() =>{
    console.log(`Server listening on port ${port}...`);
});



