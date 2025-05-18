import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'; // must be correct relative path

dotenv.config();

const app = express();

// Middleware to parse JSON (important)
app.use(express.json());

// Register route
app.use('/api/user', userRouter);

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Connect to MongoDB (optional: comment out if debugging without DB)
mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
