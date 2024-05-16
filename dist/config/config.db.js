"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateDB = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_typescript_1 = require("sequelize-typescript");
const models_dependencies_1 = require("../models/models.dependencies");
dotenv_1.default.config();
const connection = new sequelize_typescript_1.Sequelize({
    host: process.env.DBHOST,
    dialect: "mysql",
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBASE,
    storage: "database.mysql",
    models: models_dependencies_1.ModelsDependencies,
});
// Función para autenticar
const authenticateDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection.authenticate();
        connection.sync();
        console.log("La conexión ha sido establecida exitosamente. 🐵");
    }
    catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
});
exports.authenticateDB = authenticateDB;
exports.default = exports.authenticateDB;
