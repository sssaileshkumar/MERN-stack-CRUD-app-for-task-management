const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

// Get one task
const getTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'Task not found' });

  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json(task);
};

// Create task
const createTask = async (req, res) => {
  const { title, description, priority } = req.body;

  let missing = [];
  if (!title) missing.push('title');

  if (missing.length)
    return res.status(400).json({ error: 'Please fill in all required fields', missing });

  try {
    const task = await Task.create({ title, description, priority });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid task ID' });

  const task = await Task.findByIdAndDelete(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json(task);
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid task ID' });

  const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json(task);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
};
