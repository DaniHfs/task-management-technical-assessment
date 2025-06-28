import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

dotenv.config(); // load environment variables

const app = express(); // init express app

// middleware setup
app.use(cors());
app.use(express.json());

// route handlers
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// basic route to test server
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000; // set port

// start server & listen on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});