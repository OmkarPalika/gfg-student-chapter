// middleware/index.js
import errorHandler from './errorHandler.js';
import rateLimiter from './rateLimiter.js';
import validate from './validate.js';
import authorize from './authorize.js';
import auth from './auth.js';

const setupMiddlewares = (app) => {
  app.use(express.json());
  app.use(helmet());
  app.use(mongoSanitize());
  app.use(xss());
  app.use(compression());
  app.use(morgan('combined'));
  app.use(rateLimiter);

  // CORS Configuration
  const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(cors(corsOptions));

  app.use(auth);
  app.use(validate);
  app.use(authorize);
  app.use(errorHandler);
};

export default setupMiddlewares;
