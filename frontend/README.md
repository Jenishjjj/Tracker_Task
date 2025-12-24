# Habit Tracker Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (optional):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Features

- User authentication (signup/login)
- Dashboard with habit statistics
- Create and manage habits
- Track habit completion
- Responsive design
- Persistent authentication with localStorage

## Pages

- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Main dashboard
- `/habits` - View all habits
- `/habits/new` - Create new habit
