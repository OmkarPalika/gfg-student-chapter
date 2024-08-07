// server.js
import { set, connect } from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import setupMiddlewares from './middleware/index.js';

// Load environment variables from .env in the root directory of 'server/'
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Initialize Express app
const app = express();
setupMiddlewares(app); // Setup middleware stack

// Connect to MongoDB
set('strictQuery', true);
connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process with failure
});

// Import routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import notificationsRouter from './routes/notifications.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/notifications', notificationsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
