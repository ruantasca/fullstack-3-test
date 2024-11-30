import express from 'express'
import { pegarTodosArtistas, pegarArtistaPorId, pegarAlbumsPorArtista } from '../controller/ArtistController';

const rotas_artistas = express.Router();

rotas_artistas.get('/', pegarTodosArtistas);
rotas_artistas.get('/:id', pegarArtistaPorId);
rotas_artistas.get('/:id/albums/', pegarAlbumsPorArtista);  


export {rotas_artistas};