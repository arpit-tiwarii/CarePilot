# Healthcare MERN Application

A full-stack healthcare symptom tracking system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows patients to log symptoms and receive AI-powered suggestions, while doctors can review patient logs and provide oversight.

## Features

- **Patient Dashboard**: Log symptoms, temperature, duration, and notes
- **Doctor Dashboard**: Review all patient logs with filtering capabilities
- **Rules Engine**: JSON-based symptom evaluation system
- **Real-time Suggestions**: AI-like recommendations based on symptom patterns
- **History Tracking**: Visual charts and historical data for patients
- **Role-based Authentication**: Separate interfaces for patients and doctors
- **Responsive Design**: Modern UI built with Tailwind CSS

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-mern-app
   ```

2. **Install server dependencies**
   ```bash
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory based on `env.example`:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/healthcare_app
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # Email Configuration (optional)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Client URL (for email links)
   CLIENT_URL=http://localhost:3000
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI in .env with your Atlas connection string
   ```


## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```
   Server will run on http://localhost:5000

2. **Start the frontend** (in a new terminal)
   ```bash
   npm run client
   ```
   Frontend will run on http://localhost:3000

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users (for doctor dashboard)

### Symptoms
- `POST /api/symptoms` - Submit symptoms and get evaluation
- `GET /api/logs` - Get symptom logs (optionally filtered by patient)

## Getting Started

### Option 1: Use Demo Accounts (Quick Start)
- **Patient**: `demo.patient` / `patient123`
- **Doctor**: `demo.doctor` / `doctor123`

### Option 2: Create New Account
1. **Create an Account**: Use the "Sign Up" button to create a new account
2. **Choose Role**: Select either "Patient" or "Doctor" during registration
3. **Login**: Use your credentials to access the appropriate dashboard

### Seed Demo Data
To populate the database with demo users and sample logs:
```bash
node server/scripts/seedData.js
```

## Rules Engine

The application includes a rules-based evaluation system that analyzes symptoms and provides suggestions:

- **Emergency Rules**: Chest pain or shortness of breath triggers emergency flags
- **Fever Rules**: High temperature warnings and suggestions
- **Duration Rules**: Prolonged symptoms recommendations
- **Symptom Combinations**: Complex pattern matching for better suggestions

## Project Structure

```
healthcare-mern-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.js         # Main App component
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── rules/             # Rules engine
│   ├── scripts/           # Database seeding
│   └── index.js           # Server entry point
├── package.json           # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational/demo purposes only and is not intended for medical use.

## Disclaimer

This application is a prototype for demonstration purposes only. It is not intended to provide medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.
