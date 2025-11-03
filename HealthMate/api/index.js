// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// ----- IMPORT YOUR ROUTES -----
import authRoutes         from './routes/auth.js';
import healthRoutes       from './routes/health.js';
import alertRoutes        from './routes/alerts.js';
import aiRoutes           from './routes/ai.js';
import gamificationRoutes from './routes/gamification.js';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://health-mate-website.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

// ------------------- CORS -------------------
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);               // Postman, curl, mobile
      if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
        return callback(null, origin);
      }
      // ----- REMOVE the line below in production -----
      return callback(null, true); // temporary allow-all while testing
    },
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','Accept','Origin'],
    optionsSuccessStatus: 200   // <--- MUST BE 200, NOT 204
  })
);

// ------------------- BODY PARSER -------------------
app.use(express.json());

// ------------------- ROUTES -------------------
app.use('/api/auth',          authRoutes);
app.use('/api/health',        healthRoutes);
app.use('/api/alerts',        alertRoutes);
app.use('/api/ai',            aiRoutes);
app.use('/api/gamification',  gamificationRoutes);

// Health check
app.get('/api/health-check', (req, res) => res.json({ ok: true }));

// 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

export default app;