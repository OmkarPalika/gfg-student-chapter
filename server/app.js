import express from 'express';
import { resolve, join } from 'path';
import dotenv from 'dotenv';
import setupMiddlewares from './middleware/index.js';
import pkg from './swagger.js';
const { swaggerUi, specs } = pkg;

dotenv.config({ path: resolve(process.cwd(), '..', '.env') });

const app = express();

// Initialize middleware setup
setupMiddlewares(app);

// Serve Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Serve static files (uploads)
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

export default app;
