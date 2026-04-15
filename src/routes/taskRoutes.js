import express from 'express';
import { getAllTasks } from '../controllers/taskController.js';
import { validateGetTasks } from '../middleware/taskValidators.js';

const router = express.Router();

router.get('/', validateGetTasks, getAllTasks);

export default router;