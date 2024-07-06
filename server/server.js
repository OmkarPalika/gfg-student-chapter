import express, { json, static as expressStatic } from 'express';
import { set, connect } from 'mongoose';
import cors from 'cors';
import { resolve, join } from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import { swaggerUi, specs } from './swagger';
import { errorHandler, rateLimiter } from './middleware';
require('dotenv').config({ path: resolve(__dirname, '../.env') });

const app = express();

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Logging Middleware
app.use(morgan('combined'));

// Rate Limiting Middleware
app.use(rateLimiter);

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Middleware
app.use(json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(errorHandler);

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
set('strictQuery', true);
connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes').default);
app.use('/api/events', require('./routes/eventRoutes').default);
app.use('/api/resources', require('./routes/resourceRoutes').default);
app.use('/api/feedback', require('./routes/feedbackRoutes').default);
app.use('/api/users', require('./routes/userRoutes').default);
app.use('/api/media', require('./routes/mediaRoutes').default);
app.use('/api/blog', require('./routes/blogRoutes').default);
app.use('/api/discussions', require('./routes/discussionRoutes').default);

app.use('/uploads', expressStatic(join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;

