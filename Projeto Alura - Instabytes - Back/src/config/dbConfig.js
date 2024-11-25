//Código que conecta com o Mongo, não será mudado nunca

// Import the MongoClient class from the MongoDB driver. This class is essential for interacting with MongoDB databases.
import { MongoClient } from 'mongodb';

// Define a function called 'conectarAoBanco' that takes the connection string as input. This string tells the app where to find the database.
export default async function conectarAoBanco(stringConexao) {
  // Declare a variable to hold the MongoClient instance.  Think of it as a doorway to your database.
  let mongoClient;

  // Use a try...catch block to handle potential errors during the connection process. It's like preparing for a possible mishap.
  try {
      // Create a new MongoClient instance using the provided connection string.  This is like knocking on the database door.
      mongoClient = new MongoClient(stringConexao);
      // Log a message to the console indicating that the application is attempting to connect to the database cluster.
      console.log('Conectando ao cluster do banco de dados...');
      // Asynchronously connect to the MongoDB server. This is like waiting for someone to open the database door.
      await mongoClient.connect();
      // Log a success message to the console once the connection is established.
      console.log('Conectado ao MongoDB Atlas com sucesso!');

      // Return the connected MongoClient instance so that other parts of the app can use it. This is like stepping through the open doorway.
      return mongoClient;
  } catch (erro) { // Catch any errors that occur during the connection process. This is what happens if something goes wrong when trying to open the door.
      // Log an error message to the console along with the error object.
      console.error('Falha na conexão com o banco!', erro);
      // Terminate the application process. This is a drastic step, but sometimes necessary if the database connection fails.
      process.exit();
  }
}