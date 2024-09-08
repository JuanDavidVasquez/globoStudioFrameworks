import express from "express";
const router = express.Router();
import {
    createOrderItem,
    updateOrderItem,
    createOrderItems,
    updateOrderwithTotal,
    getOrderWithItems,
    getOrdersByUser,
    createOrderWithItems,
    getOrdersWithItems,
} from '../controllers/orderItemController.js';

import checkAuth from '../middleware/checkAuth.js';

router.post('/new-order-item', checkAuth, createOrderItem);
router.put('/update-order-item', checkAuth, updateOrderItem);
router.post('/new-order-items', checkAuth, createOrderItems);
router.get('/order/:id', checkAuth, updateOrderwithTotal);
router.get('/order-complet/:id', checkAuth, getOrderWithItems);
router.get('/orders/:id', checkAuth, getOrdersByUser);
router.post('/order-create', checkAuth, createOrderWithItems);
router.get('/orders', checkAuth, getOrdersWithItems);

export default router;