const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    streak: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
}, {versionKey: false,});

module.exports = mongoose.model('Habit', habitSchema,'Habique');
