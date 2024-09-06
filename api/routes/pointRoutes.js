import express from 'express';
const router = express.Router();
import {
    createPoint, 
    getPoint, 
    getPoints, 
    updatePoint, 
    deletePoint
} from '../controllers/pointController.js';

import checkAuth from '../middleware/checkAuth.js';

router.get('/', getPoints);
router.post('/new-punto', checkAuth, createPoint);
router.get('/:id', getPoint);
router.put('/:id', checkAuth, updatePoint);
router.delete('/:id', checkAuth, deletePoint);

export default router;