// index.js
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './errorHandler.js';
import rateLimiter from './rateLimiter.js';
import validate from './validate.js';
import authorize from './authorize.js';
import auth from './auth.js';

const setupMiddlewares = (app) => {
  // Middleware stack
  app.use(express.json()); // Parse incoming requests with JSON payloads
  app.use(helmet()); // Secure HTTP headers
  app.use(mongoSanitize()); // Sanitize data to prevent MongoDB Operator Injection
  app.use(xss()); // Prevent XSS attacks
  app.use(compression()); // Compress HTTP responses
  app.use(morgan('combined')); // HTTP request logger

  // Rate limiting middleware
  app.use(rateLimiter);

  // CORS Configuration
  const corsOptions = {
    origin: ['http://localhost:3000'], // Allow requests from localhost:3000
    optionsSuccessStatus: 200, // Return 200 for successful preflight requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specified headers
  };
  app.use(cors(corsOptions)); // Enable CORS with options

  // Custom middleware for authentication, validation, authorization, and error handling
  app.use(auth); // Authentication middleware
  app.use(validate); // Validation middleware
  app.use(authorize); // Authorization middleware
  app.use(errorHandler); // Global error handling middleware
};

export default setupMiddlewares;
