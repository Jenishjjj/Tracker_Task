const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Habit = require('../models/Habit');
const HabitCompletion = require('../models/HabitCompletion');

router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 });
    
    const today = new Date().toISOString().split('T')[0];
    const todayCompletions = await HabitCompletion.find({
      userId: req.userId,
      completedDate: today
    });
    
    const completedHabitIds = new Set(todayCompletions.map(c => c.habitId.toString()));
    
    const habitsWithStatus = habits.map(habit => ({
      id: habit._id,
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      createdAt: habit.createdAt,
      completedToday: completedHabitIds.has(habit._id.toString())
    }));

    res.json({
      success: true,
      habits: habitsWithStatus
    });
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching habits' 
    });
  }
});

router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Habit name is required')
    .isLength({ max: 100 }).withMessage('Habit name cannot exceed 100 characters'),
  body('description').optional().trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('frequency').isIn(['daily', 'weekly', 'monthly']).withMessage('Invalid frequency')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        message: errors.array()[0].msg 
      });
    }

    const { name, description, frequency } = req.body;

    const habit = new Habit({
      userId: req.userId,
      name,
      description: description || '',
      frequency
    });

    await habit.save();

    res.status(201).json({
      success: true,
      habit: {
        id: habit._id,
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        createdAt: habit.createdAt,
        completedToday: false
      }
    });
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating habit' 
    });
  }
});

router.post('/:id/complete', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    
    const completedDate = date || new Date().toISOString().split('T')[0];

    const habit = await Habit.findOne({ _id: id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ 
        success: false, 
        message: 'Habit not found' 
      });
    }

    const existingCompletion = await HabitCompletion.findOne({
      habitId: id,
      userId: req.userId,
      completedDate
    });

    if (existingCompletion) {
      return res.status(400).json({ 
        success: false, 
        message: 'Habit already marked as complete for this date' 
      });
    }

    const completion = new HabitCompletion({
      habitId: id,
      userId: req.userId,
      completedDate
    });

    await completion.save();

    res.json({
      success: true,
      message: 'Habit marked as complete',
      completedDate
    });
  } catch (error) {
    console.error('Complete habit error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking habit as complete' 
    });
  }
});

router.get('/:id/status', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    
    const checkDate = date || new Date().toISOString().split('T')[0];

    const habit = await Habit.findOne({ _id: id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ 
        success: false, 
        message: 'Habit not found' 
      });
    }

    const completion = await HabitCompletion.findOne({
      habitId: id,
      userId: req.userId,
      completedDate: checkDate
    });

    res.json({
      success: true,
      isCompleted: !!completion,
      date: checkDate
    });
  } catch (error) {
    console.error('Get habit status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking habit status' 
    });
  }
});

module.exports = router;
