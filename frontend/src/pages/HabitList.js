import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitsAPI } from '../services/api';
import './HabitList.css';

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await habitsAPI.getHabits();
      if (response.data.success) {
        setHabits(response.data.habits);
      }
    } catch (error) {
      setError('Failed to load habits. Please try again.');
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (habitId) => {
    try {
      setError('');
      setSuccessMessage('');
      
      const response = await habitsAPI.completeHabit(habitId);
      
      if (response.data.success) {
        setSuccessMessage('Habit marked as complete!');
        
        setHabits(habits.map(habit => 
          habit.id === habitId 
            ? { ...habit, completedToday: true }
            : habit
        ));

        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to mark habit as complete';
      setError(errorMsg);
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="habit-list-container">
      <div className="habit-list-header">
        <h1>My Habits</h1>
        <div className="header-actions">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="button button-secondary"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => navigate('/habits/new')} 
            className="button button-primary"
          >
            Add New Habit
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {loading ? (
        <div className="loading">Loading habits...</div>
      ) : habits.length === 0 ? (
        <div className="empty-state-box">
          <h2>No habits yet</h2>
          <p>Create your first habit to get started!</p>
          <button 
            onClick={() => navigate('/habits/new')} 
            className="button button-primary"
          >
            Create Habit
          </button>
        </div>
      ) : (
        <div className="habits-grid">
          {habits.map(habit => (
            <div key={habit.id} className="habit-card">
              <div className="habit-card-header">
                <h3>{habit.name}</h3>
                {habit.completedToday && (
                  <span className="completed-badge">✓ Completed</span>
                )}
              </div>
              
              <p className="habit-description">
                {habit.description || 'No description provided'}
              </p>
              
              <div className="habit-card-footer">
                <span className="frequency-tag">{habit.frequency}</span>
                
                {!habit.completedToday ? (
                  <button 
                    onClick={() => handleMarkComplete(habit.id)}
                    className="button button-primary mark-done-btn"
                  >
                    Mark as Done
                  </button>
                ) : (
                  <button 
                    className="button mark-done-btn"
                    disabled
                    style={{ background: '#e0e0e0', color: '#999' }}
                  >
                    Done Today
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitList;
