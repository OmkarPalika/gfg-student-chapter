const rateLimit = require('express-rate-limit');
const config = require('config');

const rateLimiter = rateLimit({
  windowMs: config.get('rateLimit.windowMs'),
  max: config.get('rateLimit.max'),
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

module.exports = rateLimiter;
