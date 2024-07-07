import express, { json } from 'express';
import { set, connect } from 'mongoose';
import cors from 'cors';
import { resolve, join } from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import dotenv from 'dotenv';
import setupMiddlewares from './middleware/index.js';
import pkg from './swagger.js';
const { swaggerUi, specs } = pkg;

dotenv.config({ path: resolve(process.cwd(), '..', '.env') });

const app = express();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Logging Middleware
app.use(morgan('combined'));

// Rate Limiting Middleware and other custom middlewares
setupMiddlewares(app);

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(json());

// Serve Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Connect to MongoDB
set('strictQuery', true);
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// Serve static files (uploads)
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// Routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import userRoutes from './routes/userRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/discussions', discussionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
