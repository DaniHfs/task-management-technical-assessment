import { Router, Request, Response, NextFunction } from 'express';
import {
    createTaskHandler,
    getTasksHandler,
    updateTaskHandler,
    deleteTaskHandler
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// ALL ROUTES BELOW ARE PROTECTED
router.use(authenticateToken);

// POST /api/tasks
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    createTaskHandler(req, res).catch(next);
});

// GET /api/tasks
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    getTasksHandler(req, res).catch(next);
});

// PUT /api/tasks/:id
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    updateTaskHandler(req, res).catch(next);
});

// DELETE /api/tasks/:id
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    deleteTaskHandler(req, res).catch(next);
});

export default router;