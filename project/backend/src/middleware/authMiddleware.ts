import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// expected decoded payload structure
interface JwtPayload {
    userId: number;
}

// extend request to include userId property
declare module 'express-serve-static-core' {
    interface Request {
        userId?: number;
    }
}

/**
 * Middleware to authenticate JWT tokens for protected routes.
 * Verified the token from the Authorization header and extracts the user ID.
 */
export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    
    // get token from authorization header: Bearer <token>
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) { // missing token
        res.status(401).json({ message: 'Access token missing' });
        return; // exit early
    }

    try {
        // verify token & attach userId to req object
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userId = payload.userId;
        next(); // proceed to next middleware
    } catch (error) {
        // invalid or expired token
        res.status(403).json({ message: 'Invalid or expired token' });
        return; // exit early
    }
}