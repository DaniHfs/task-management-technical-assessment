import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const SALT_ROUNDS = 10;

/**
 * Handles user registration
 */
export async function register(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    try {
        // check if user exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // create user
        const newUser = await createUser(email, hashedPassword, name);

        // generate JWT token
        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error('Registration error: ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Handles user login
 */
export async function login(req: Request, res: Response) {
    const { email, password,} = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ user, token });
    } catch (error) {
        console.error('Login error: ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Returns the authenticated user's profile
 */
export async function getProfile(req: Request, res: Response) {
    try {
        // ensure userId is present for auth middleware
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // fetch user from db
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // return user profile without sensitive fields
        return res.json({ user });

        } catch (error) {
            console.error('Profile retrieval error: ', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
}
