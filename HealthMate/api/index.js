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
// CORS configuration - allow frontend origin
const allowedOrigins = [
  'http://localhost:3000',
  'https://health-mate-website.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or if it's a Vercel preview URL
    if (allowedOrigins.includes(origin) || 
        origin.includes('health-mate-website') ||
        origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      // For development, allow all
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(null, true); // Allow for now, can restrict later
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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
