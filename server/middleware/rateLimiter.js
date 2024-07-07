// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';
import config from 'config';

const rateLimiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs') || 15 * 60 * 1000, // Default: 15 minutes
  max: config.get('rateLimit.max') || 100, // Default: 100 requests
  message: 'Too many requests from this IP, please try again later' // Default error message
});

export default rateLimiter;
