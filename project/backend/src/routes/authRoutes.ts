import { Router, Request, Response, NextFunction } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// POST api/auth/register
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    register(req, res).catch(next);
});

// POST api/auth/login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);
});

// GET api/auth/profile PROTECTED ROUTE
router.get('./profile', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
    getProfile(req, res).catch(next);
});

export default router;