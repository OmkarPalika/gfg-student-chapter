import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GFG Student Chapter API',
      version: '1.0.0',
      description: 'API documentation for the GeeksforGeeks Student Chapter project.',
      contact: {
        name: 'Omkar Palika',
        email: 'palikaomkar.22.cse@anits.edu.in',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
        {
          url: 'https://gfg-student-chapter.herokuapp.com',
          description: 'Production server',
        },
      ],
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes folder
};

const specs = swaggerJsDoc(options);

export default {
  swaggerUi,
  specs,
};
