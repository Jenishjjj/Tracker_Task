# Habit Tracker Backend API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set a secure JWT secret
   - Configure the port (default: 5000)

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Habits (Authentication Required)
- `GET /api/habits` - Get all user habits
- `POST /api/habits` - Create a new habit
- `POST /api/habits/:id/complete` - Mark habit as complete
- `GET /api/habits/:id/status` - Get habit completion status

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
