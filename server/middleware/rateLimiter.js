import rateLimit from 'express-rate-limit';
import config from 'config';

const rateLimiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default rateLimiter;
