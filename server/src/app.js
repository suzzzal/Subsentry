import cors from 'cors';
import express from 'express';
import subscriptionRoutes from './routes/subscription.routes.js';
import auth from './middleware/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(auth); // Authentication middleware (sets req.user if auth header present)

// Health check route
app.get('/', (_, res) => {
  res.send('SubSentry API running');
});

// API routes
app.use('/api/subscriptions', subscriptionRoutes);

export default app;

