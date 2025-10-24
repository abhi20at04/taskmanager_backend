import express from 'express';
import Todo from '../models/todo.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

const router = express.Router();
router.use(authMiddleware);

// Get all todos for logged-in user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new todo for logged-in user
router.post('/', async (req, res) => {
  const { name, dueDate } = req.body;
  if (!name || !dueDate)
    return res.status(400).json({ message: 'Name and dueDate are required' });
  try {
    const newTodo = new Todo({ name, dueDate, userId: req.user.id });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a todo by ID (only if belongs to user)
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

