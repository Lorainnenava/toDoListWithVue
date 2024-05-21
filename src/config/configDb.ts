import "reflect-metadata";
import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { ModelsDependencies } from "../models/modelsDependencies";

dotenv.config();

const connection = new Sequelize({
  host: process.env.DBHOST,
  dialect: "mysql",
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBASE,
  storage: "database.mysql",
  models: [...ModelsDependencies],
});

// Función para autenticar
export const authenticateDB = async () => {
  try {
    await connection.authenticate();
    // connection.sync();
    console.log("La conexión ha sido establecida exitosamente. 🐵");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};

export default authenticateDB;
