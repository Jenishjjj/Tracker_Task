# Habit Tracker Application

A full-stack habit tracking application built with React and Node.js that helps users build and maintain positive habits.

## Features

### Frontend (React)
- **Authentication**: Secure login and signup with form validation
- **Dashboard**: Overview of all habits with quick stats
- **Habit Management**: Create, view, and track habits
- **Completion Tracking**: Mark habits as done for specific dates
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Backend (Node.js/Express)
- **RESTful API**: Clean and organized API endpoints
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Database**: Scalable NoSQL database
- **Data Validation**: Input validation for all endpoints
- **Error Handling**: Comprehensive error handling

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- JSON Web Tokens (JWT) for authentication
- express-validator for input validation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection to MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd habit-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/habit-tracker
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login existing user

### Habits (Protected Routes)
- `GET /api/habits` - Get all habits for current user
- `POST /api/habits` - Create a new habit
- `POST /api/habits/:id/complete` - Mark habit as complete
- `GET /api/habits/:id/status` - Check habit completion status

## Database Schema

### Users Collection
- `email`: String (unique, required)
- `password`: String (hashed, required)
- `createdAt`: Date

### Habits Collection
- `userId`: ObjectId (reference to User)
- `name`: String (required)
- `description`: String
- `frequency`: String (daily/weekly/monthly)
- `createdAt`: Date

### HabitCompletions Collection
- `habitId`: ObjectId (reference to Habit)
- `userId`: ObjectId (reference to User)
- `completedDate`: String (YYYY-MM-DD format)
- `createdAt`: Date

## Project Structure

```
habit-tracker/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Habit.js
│   │   └── HabitCompletion.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── habits.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── HabitList.js
│   │   │   └── NewHabit.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Features in Detail

### User Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Persistent login sessions
- Protected routes

### Habit Management
- Create habits with name, description, and frequency
- View all personal habits
- Mark habits as complete for today
- Visual indicators for completed habits
- Statistics and progress tracking

### User Experience
- Clean and intuitive interface
- Responsive design for all devices
- Real-time feedback for user actions
- Error handling and validation messages

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # Uses react-scripts for hot reload
```

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- User data isolation

## License
This project is licensed under the ISC License.
