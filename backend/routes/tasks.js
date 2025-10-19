import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const { task, taskdate, taskStarttime, taskEndtime, completed } = req.body;

    if (!task || !taskdate) {
      return res.status(400).json({ message: "Task and taskdate are required" });
    }

    const newTask = new Task({
      task,
      taskdate,
      taskStarttime,
      taskEndtime,
      completed: completed || false
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update task (toggle complete)
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task date/time
router.put('/:id', async (req, res) => {
  try {
    const { taskdate, taskStarttime, taskEndtime } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { taskdate, taskStarttime, taskEndtime },
      { new: true } // return updated document
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE tasks completed more than 24 hours ago
router.delete('/cleanup', async (req, res) => {
  try {
    const ONE_DAY = 24*60*60*1000;
    const cutoff = new Date(Date.now() - ONE_DAY);

    const result = await Task.deleteMany({
      completed: true,
      completedOn: { $lt: cutoff }
    });

    res.json({ message: "Old tasks deleted", deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
