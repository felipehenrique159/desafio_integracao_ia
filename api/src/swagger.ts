import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Desafio IA - API de Análise de Texto',
      version: '1.0.0',
      description: 'Documentação da API de análise de texto',
    },
  },
  apis: ['./src/routes.ts']
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };