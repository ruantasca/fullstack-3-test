import express from "express";
import { registrarUsuario, autenticarUsuario } from "../controller/authController.js";

const rotasAutenticacao = express.Router();

rotasAutenticacao.post('/registro', registrarUsuario);
rotasAutenticacao.post('/login', autenticarUsuario);


export { rotasAutenticacao };
