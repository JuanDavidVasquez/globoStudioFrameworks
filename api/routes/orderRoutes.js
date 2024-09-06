import express from "express";
const router = express.Router();
import {
    createOrder,
    obtenerOrderUser,
    obtenerOrder,
} from '../controllers/orderController.js';

import checkAuth from '../middleware/checkAuth.js';

router.post('/new-order', checkAuth, createOrder);
router.get('/:user_id', checkAuth, obtenerOrderUser);
router.get('/order/:id', checkAuth, obtenerOrder);

export default router;