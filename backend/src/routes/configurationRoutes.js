import { Router } from 'express';
import { getInitialMatrix, updateRemark } from '../controllers/configurationController.js';
const router = Router();
router.get('/:id', getInitialMatrix);
router.put('/:id', updateRemark);
export default router;