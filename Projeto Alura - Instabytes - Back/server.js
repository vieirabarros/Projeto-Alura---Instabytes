import express from "express";

//Criação do servidor
const app = express(); 
const port = 3000;

const posts = [
  {
    id: 1,
    descricao: "Uma foto teste",
    imagem: "https://placecats.com/millie/300/150"   
  },
  {
    id: 2,
    descricao: "Gato brincando com um novelo de lã",
    imagem: "https://placecats.com/millie/300/150"   
  },
  {
    id: 3,
    descricao: "Paisagem de outono",
    imagem: "https://placecats.com/millie/300/150" 
  }
];


app.use(express.json());

app.listen(port,() =>{
    console.log(`Server listening on port ${port}...`);
});


//busca em uma "/rota", faz uma "requisição" e recebe uma "resposta"
app.get("/posts", (req, res) => {
  // const index = buscarPostPorID(req.params.id);  
    res.status(200).json(posts);
  }); 

//retorna o índice do primeiro elemento que passa o teste dado por uma função
function buscarPostPorID(id) { 
  return posts.findIndex((post)=>{ 
    return post.id === Number(id)  
  })
};

//busca em uma "/rota", faz uma "requisição" e recebe uma "resposta"
app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorID(req.params.id)
  res.status(200).json(posts[index]);
}); 

