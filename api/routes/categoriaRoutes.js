import express from "express";
const router = express.Router();
import {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    editarCategoria,
    eliminarCategoria
} from '../controllers/categoriaController.js';

import checkAuth from '../middleware/checkAuth.js';

router.get('/', obtenerCategorias);
router.post('/new-categoria', checkAuth, crearCategoria);
router.get('/:id', obtenerCategoria);
router.put('/:id', checkAuth, editarCategoria);
router.delete('/:id', checkAuth, eliminarCategoria);

export default router;