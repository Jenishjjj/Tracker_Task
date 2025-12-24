# Habit Tracker - Setup Guide

## Quick Start

### Prerequisites
- Node.js v14 or higher
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

#### Backend
Create `backend/.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=your_secure_jwt_secret_here_change_in_production
NODE_ENV=development
```

**Important:** Change the `JWT_SECRET` to a secure random string in production.

#### Frontend (Optional)
Create `frontend/.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

#### Option A: Local MongoDB
```bash
mongod
```

#### Option B: MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGODB_URI` in `backend/.env`

### Step 4: Run the Application

#### Terminal 1 - Backend
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```
Frontend will run on http://localhost:3000

### Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create a new account
3. Login with your credentials
4. Start creating habits!

## Testing the Backend API

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Test MongoDB connection:
```bash
cd backend
node test-connection.js
```

## Development Commands

### Backend
```bash
npm start       # Start the server
npm run dev     # Start with nodemon (auto-reload)
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check the connection string in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Set `PORT` environment variable before starting

### CORS Errors
- Verify backend is running
- Check the API URL in frontend configuration

### Authentication Issues
- Clear localStorage in browser DevTools
- Verify JWT_SECRET is set in backend
- Check token expiration (default: 7 days)

## Project Structure
```
habit-tracker/
├── backend/              # Node.js/Express API
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Entry point
├── frontend/            # React application
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── context/     # React context
│       ├── pages/       # Page components
│       └── services/    # API services
└── README.md            # Documentation
```

## Default User Flow

1. **Sign Up** → Create account with email and password
2. **Login** → Authenticate and receive JWT token
3. **Dashboard** → View statistics and recent habits
4. **Create Habit** → Add new habits to track
5. **Mark Complete** → Track daily progress
6. **View Habits** → See all habits and their status

## Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens expire after 7 days
- All habit endpoints require authentication
- Users can only access their own data
- Input validation on all endpoints

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in environment
2. Use a strong, random `JWT_SECRET`
3. Use MongoDB Atlas or managed MongoDB
4. Enable HTTPS
5. Set up proper logging
6. Configure rate limiting

### Frontend
1. Build the production bundle: `npm run build`
2. Serve the `build` folder with a web server
3. Update `REACT_APP_API_URL` to your API domain
4. Enable HTTPS

## Support

For issues or questions:
1. Check the README.md for detailed information
2. Review the API documentation
3. Check browser console and server logs
