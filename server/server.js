const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/database');
const app = express();
require('dotenv').config();
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(config.mongoURI)
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