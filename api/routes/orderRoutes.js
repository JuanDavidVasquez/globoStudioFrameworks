import express from "express";
const router = express.Router();
import {
    createOrder,
    obtenerOrderUser,
    obtenerOrder,
    orderUpdate,
} from '../controllers/orderController.js';

import checkAuth from '../middleware/checkAuth.js';

router.post('/new-order', checkAuth, createOrder);
router.get('/:id', checkAuth, obtenerOrderUser);
router.get('/order/:id', checkAuth, obtenerOrder);
router.put('/update-status/:id', checkAuth, orderUpdate);

export default router;