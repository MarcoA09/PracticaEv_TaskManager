import app from './app.js';
import { PORT } from "./config.js";
import { connectDB } from "./conexion.js";

async function main() {
    try {
      await connectDB();
      app.listen(PORT);
      console.log(`Servidor ejecutando en puerto: ${PORT}`);
    } catch (error) {
      console.error(error);
    }
  }
  
  main();

