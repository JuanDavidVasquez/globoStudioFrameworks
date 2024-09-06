import express from 'express';
const router = express.Router();
import {
    createRole,
    getRoles,
    updateRole,
    deleteRole,
} from '../controllers/roleController.js';

import checkAuth from '../middleware/checkAuth.js';

router.get('/', getRoles);
router.post('/new-role', checkAuth, createRole);
router.put('/:id', checkAuth, updateRole);
router.delete('/:id', checkAuth, deleteRole);

export default router;