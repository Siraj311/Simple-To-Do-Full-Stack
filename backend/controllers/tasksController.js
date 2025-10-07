const pool = require('../config/db');
const asyncHandler = require('express-async-handler');

// GET /api/v1/tasks
const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const limit = parseInt(req.query.limit) || 5;
    const state = req.query.state === 'completed' || false;

    const result = await pool.query(
        `SELECT id, title, description, completed, created_at
        FROM task
        WHERE completed = $1 AND user_id = $2
        ORDER BY created_at DESC
        LIMIT $3`,
        [state, userId, limit]
    );

    const tasks = result.rows;

    if(!tasks || tasks?.length === 0) {
        return res.status(200).json([]);
    }

    res.status(200).json(tasks);
})

// POST /api/v1/tasks
const createTask = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id; 

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' })
    }

    const duplicateCheck = await pool.query(
        'SELECT id FROM task WHERE user_id = $1 AND title = $2',
        [userId, title]
    );

    if (duplicateCheck.rows.length > 0) {
        return res.status(409).json({ message: 'Duplicate task title' });
    }

    await pool.query(
        'INSERT INTO task (user_id, title, description) VALUES ($1, $2, $3)',
        [userId, title, description]
    );

    res.status(201).json({ message: 'New task created' });
})

// PATCH /api/v1/tasks/:id
const completeTask = asyncHandler(async (req, res) => {
    const { id  } = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({ message: 'Task Id is required' })
    }

    const taskCheck = await pool.query(
        'SELECT * FROM task WHERE id = $1 AND user_id = $2',
        [id, userId]
    );

    if (taskCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await pool.query(
        'UPDATE task SET completed = TRUE WHERE id = $1',
        [id]
    );

    res.status(200).json({ message: `Task '${taskCheck.rows[0].title}' marked as completed` });
})


module.exports = {
    getTasks,
    createTask,
    completeTask
}