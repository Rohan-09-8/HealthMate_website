// Main entry point for Vercel serverless functions
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import route handlers
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import alertRoutes from './routes/alerts.js';
import aiRoutes from './routes/ai.js';
import gamificationRoutes from './routes/gamification.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/gamification', gamificationRoutes);

// Health check
app.get('/api/health-check', (req, res) => {
  res.json({ status: 'ok', message: 'HealthMate API is running' });
});

// Export for Vercel serverless
export default app;
