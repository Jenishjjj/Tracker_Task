import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { habitsAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completedToday: 0
  });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await habitsAPI.getHabits();
      if (response.data.success) {
        const fetchedHabits = response.data.habits;
        setHabits(fetchedHabits);
        
        const completedToday = fetchedHabits.filter(h => h.completedToday).length;
        setStats({
          total: fetchedHabits.length,
          completedToday
        });
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Habit Tracker</h1>
          <p className="welcome-text">Welcome back, {user?.email}!</p>
        </div>
        <button onClick={handleLogout} className="button button-danger">
          Logout
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Habits</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completedToday}</div>
          <div className="stat-label">Completed Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {stats.total > 0 ? Math.round((stats.completedToday / stats.total) * 100) : 0}%
          </div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button 
          onClick={() => navigate('/habits')} 
          className="button button-primary dashboard-button"
        >
          View All Habits
        </button>
        <button 
          onClick={() => navigate('/habits/new')} 
          className="button button-secondary dashboard-button"
        >
          Add New Habit
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading your habits...</div>
      ) : habits.length > 0 ? (
        <div className="recent-habits">
          <h2>Recent Habits</h2>
          <div className="habits-preview">
            {habits.slice(0, 3).map(habit => (
              <div key={habit.id} className="habit-preview-card">
                <div className="habit-info">
                  <h3>{habit.name}</h3>
                  <p>{habit.description}</p>
                  <span className="frequency-badge">{habit.frequency}</span>
                </div>
                {habit.completedToday && (
                  <div className="completion-badge">✓ Done</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No habits yet</h2>
          <p>Start building better habits today!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
