import { Request, Response } from 'express';
import { createTask, getTasksByUser, updateTask, deleteTask } from '../models/taskModel';

/**
 * Create a new task for the authenticated user
 */
export async function createTaskHandler(req: Request, res: Response) {
    const { title, description } = req.body;
    const userId = req.userId!;

    const newTask = await createTask(title, description, userId);
    res.status(201).json(newTask);
}

/**
 * Get all tasks for the authenticated user
 */
export async function getTasksHandler(req: Request, res: Response) {
    const userId = req.userId!;
    const tasks = await getTasksByUser(userId);
    res.json(tasks);
}

/**
 * Update existing task
 */
export async function updateTaskHandler(req: Request, res: Response) {
    const taskId = parseInt(req.params.id);
    const userId = req.userId!;
    const { title, description, completed } = req.body;

    const updated = await updateTask(taskId, title, description, completed, userId);

    if (!updated) {
        return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updated);
}

/**
 * Delete a task
 */
export async function deleteTaskHandler(req: Request, res: Response) {
    const taskId = parseInt(req.params.id);
    const userId = req.userId!;

    await deleteTask(taskId, userId);
    res.status(204).send();
}