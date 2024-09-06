import express from 'express';
const router = express.Router();
import {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    editarProducto,
    eliminarProducto
} from '../controllers/productoController.js';

import checkAuth from '../middleware/checkAuth.js';

router.get('/', obtenerProductos);
router.post('/new-producto', checkAuth, crearProducto);
router.get('/:id', obtenerProducto);
router.put('/:id', checkAuth, editarProducto);
router.delete('/:id', checkAuth, eliminarProducto);

export default router;