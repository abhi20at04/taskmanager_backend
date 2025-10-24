import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';

const app = express();

app.use(express.json());

// Configure CORS to allow your frontend origin
const corsOptions = {
  origin: [
    'https://task-manager-frontend-wine-rho.vercel.app',
    'http://localhost:3000', // For local development
    'http://localhost:5173' // Vite default port
  ],
  credentials: true, // Allow cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Connect DB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://abhishekraghav2004_db_user:0wfRz7ZZtX7DdMbm@cluster0.tg8wiag.mongodb.net/tododb?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('MongoDB connected');
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/todos', todoRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
