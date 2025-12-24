const mongoose = require('mongoose');

const habitCompletionSchema = new mongoose.Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedDate: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

habitCompletionSchema.index({ habitId: 1, userId: 1, completedDate: 1 }, { unique: true });
habitCompletionSchema.index({ userId: 1, completedDate: 1 });

module.exports = mongoose.model('HabitCompletion', habitCompletionSchema);
