import errorHandler from './errorHandler.js';
import rateLimiter from './rateLimiter.js';
import validate from './validate.js';
import authorize from './authorize.js';
import auth from './auth.js';

const setupMiddlewares = (app) => {
  app.use(errorHandler);
  app.use(rateLimiter);
  app.use(validate);
  app.use(authorize);
  app.use(auth);
};

export default setupMiddlewares;