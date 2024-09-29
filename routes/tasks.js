const { tasks } = require('../task.json');
const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const task = tasks.find((task) => task.id === parseInt(req.params.id))
    if(!task) return res.status(404).send({message: 'Not found'});
    res.send(task);
})

router.get('/', (req, res) => {
    let { completed, sort } = req.query;

    let filteredTasks = tasks;

    // Filter by completion status if the 'completed' query param is provided
    if (completed !== undefined) {
        const isCompleted = completed === 'true';
        filteredTasks = tasks.filter(task => task.completed === isCompleted);
    }

    // Sort by creation date if the 'sort' query param is provided
    if (sort === 'date') {
        filteredTasks = tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    res.send(filteredTasks);
});

router.get('/priority/:level', (req, res) => {
    const { level } = req.params;
    let filteredTasks = tasks;

    // Validate priority level
    if (!['low', 'medium', 'high'].includes(level)) {
        return res.status(400).send({ message: 'Invalid priority level. Must be low, medium, or high.' });
    }

    filteredTasks = tasks.filter(task => task.priority === level);

    res.send(filteredTasks);
});

router.post('/', (req, res) => {
    const { title, description, completed, priority } = req.body;

    // Input validation
    if (!title || typeof title !== 'string') {
        return res.status(400).send({ message: 'Title is required and should be a string.' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).send({ message: 'Description is required and should be a string.' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).send({ message: 'Completed status must be a boolean.' });
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).send({ message: 'Priority must be one of: low, medium, high.' });
    }

    const task = {
        id: tasks.length + 1,
        title,
        description,
        completed,
        priority,
        createdAt: new Date()
    };

    tasks.push(task);

    res.status(201).send({ success: true, task });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed, priority } = req.body;

    // Check if task exists
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).send({ message: 'Task not found' });
    }

    // Input validation
    if (!title || typeof title !== 'string') {
        return res.status(400).send({ message: 'Title is required and should be a string.' });
    }

    if (!description || typeof description !== 'string') {
        return res.status(400).send({ message: 'Description is required and should be a string.' });
    }

    if (typeof completed !== 'boolean') {
        return res.status(400).send({ message: 'Completed status must be a boolean.' });
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).send({ message: 'Priority must be one of: low, medium, high.' });
    }

    // Update the task
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed, priority };

    res.send({ success: true, task: tasks[taskIndex] });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).send({ message: 'Task not found' });
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.send({
        success: true,
        message: 'Task deleted successfully',
        task: deletedTask
    });
});

module.exports = router;