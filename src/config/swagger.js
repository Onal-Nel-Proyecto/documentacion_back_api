import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentación Drive",
      version: "1.0.0",
      description: "API para obtener imágenes desde Google Drive organizadas por tipo y módulo",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/static/*.js"
  ],
  
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;