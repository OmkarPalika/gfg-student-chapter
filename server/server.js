const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const path = require('path');
const { errorHandler, rateLimiter } = require('./middleware');
const helmet = require('helmet');
const { swaggerUi, specs } = require('./swagger');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
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
  origin: ['http://yourfrontenddomain.com'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(config.get('mongoURI'))
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/blog', require('./routes/blogRoutes'));
app.use('/api/discussions', require('./routes/discussionRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
