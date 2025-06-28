import pool from '../utils/db';
import { User } from '../types/User';

/**
 * Creates a new user in the database
 * @param email - User's email
 * @param hashedPassword - Hashed password
 * @param name - User's name
 * @returns The newly created user (excluding the password)
 */
export async function createUser(email: string, hashedPassword: string, name: string): Promise<Omit<User, 'password'>> {
    const result = await pool.query(
        `
        INSERT INTO users (email, password, name)
        VALUES ($1, $2, $3)
        RETURNING id, email, name, created_at
        `,
        [email, hashedPassword, name]
    );

    return result.rows[0];
}

/**
 * Finds a user by email
 * @param email - User's email
 * @returns The user record, or null if not found
 */
export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0] || null;
}

/**
 * Finds a user by their ID
 */
export async function findUserById(id: number) {
    const result = await pool.query(
        'SELECT id, email, name, created_at FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
}