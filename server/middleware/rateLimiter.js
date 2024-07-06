import rateLimit from 'express-rate-limit';
import { get } from 'config';

const rateLimiter = rateLimit({
  windowMs: get('rateLimit.windowMs'),
  max: get('rateLimit.max'),
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

export default rateLimiter;
