import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
mongoose.connect('mongodb+srv://abhishekraghav2004_db_user:0wfRz7ZZtX7DdMbm@cluster0.tg8wiag.mongodb.net/tododb?retryWrites=true&w=majority')
.then(() => {
  console.log('MongoDB connected');
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/todos', todoRoutes);

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
