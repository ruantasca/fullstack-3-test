import Express from "express"
import { getAlbum, getAlbuns, getArtists, getMusica, getArtista } from "../controller/AlbumController.js"

const rotasG = Express.Router()

rotasG.get("/getAlbuns", getAlbuns)
rotasG.get("/getArtistas", getArtists)
rotasG.post("/getMusica", getMusica)
rotasG.post("/getAlbum", getAlbum)
rotasG.post("/getArtista", getArtista)

export {rotasG}