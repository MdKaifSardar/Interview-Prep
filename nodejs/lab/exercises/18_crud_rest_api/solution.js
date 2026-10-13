// solution.js
const express = require('express');

function createCrudRouter() {
  const router = express.Router();
  let tasks = [];
  let nextId = 1;

  router.get('/', (req, res) => {
    res.json(tasks);
  });

  router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  });

  router.post('/', (req, res) => {
    const { title } = req.body || {};
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = { id: nextId++, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
  });

  router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.completed !== undefined) task.completed = Boolean(req.body.completed);

    res.json(task);
  });

  router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    tasks.splice(index, 1);
    res.status(204).end();
  });

  return router;
}

module.exports = { createCrudRouter };
