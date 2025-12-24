import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitsAPI } from '../services/api';
import './NewHabit.css';

const NewHabit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name.trim()) {
      setError('Habit name is required');
      return false;
    }

    if (name.trim().length > 100) {
      setError('Habit name cannot exceed 100 characters');
      return false;
    }

    if (description.trim().length > 500) {
      setError('Description cannot exceed 500 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await habitsAPI.createHabit(
        name.trim(),
        description.trim(),
        frequency
      );

      if (response.data.success) {
        navigate('/habits');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create habit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-habit-container">
      <div className="new-habit-card">
        <div className="new-habit-header">
          <h1>Create New Habit</h1>
          <button 
            onClick={() => navigate('/habits')} 
            className="button button-secondary"
          >
            Back to Habits
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Habit Name <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Exercise, Read for 30 minutes"
              disabled={loading}
              maxLength={100}
            />
            <small className="char-count">{name.length}/100</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="input textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your habit (optional)"
              disabled={loading}
              rows={4}
              maxLength={500}
            />
            <small className="char-count">{description.length}/500</small>
          </div>

          <div className="form-group">
            <label htmlFor="frequency">
              Frequency <span className="required">*</span>
            </label>
            <select
              id="frequency"
              className="input select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              disabled={loading}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/habits')}
              className="button button-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button-primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHabit;
