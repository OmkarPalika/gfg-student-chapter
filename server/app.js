import express from 'express';
import { join } from 'path';
import setupMiddlewares from './middleware/index.js';
import pkg from './swagger.js';
const { swaggerUi, specs } = pkg;

const app = express();

// Initialize middleware setup
setupMiddlewares(app);

// Serve Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Serve static files (uploads)
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

export default app;
