const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits
router.get('/', async (req, res) => {
    const habits = await Habit.find();
    res.json(habits);
});

// Add a habit
router.post('/', async (req, res) => {
    const habit = new Habit(req.body);
    await habit.save();
    res.json(habit);
});

// Update a habit
router.put('/:id', async (req, res) => {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(habit);
});

// Delete a habit
router.delete('/:id', async (req, res) => {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted' });
});

module.exports = router;
