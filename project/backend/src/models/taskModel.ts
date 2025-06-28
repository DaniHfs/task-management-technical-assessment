import pool from '../utils/db';

// task type definition
export interface Task {
    id?: number;
    title: string;
    description?: string;
    user_id: number;
    completed?: boolean;
}

// create task
export async function createTask(title: string, description: string, userId: number) {
    const result = await pool.query(
        'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, description, userId]
    );
    return result.rows[0];
}

// get all tasks for user
export async function getTasksByUser(userId: number) {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC',
        [userId]
    );
    return result.rows;
}

// update a task
export async function updateTask(taskId: number, title: string, description: string, completed: boolean, userId: number) {
    const result = await pool.query(
        `UPDATE tasks
        SET title = $1, description = $2, completed = $3
        WHERE id = $4 AND user_id = $5
        RETURNING *`,
        [title, description, completed, taskId, userId]
    );
    return result.rows[0];
}

// delete a task
export async function deleteTask(taskId: number, userId: number) {
    await pool.query('DELETE FROM tasks WHER id = $1 AND user_id = $2', [taskId, userId]);
}