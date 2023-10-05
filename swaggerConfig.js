const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation On Employee Management ",
      version: "1.0.0",
      description: "API documentation for your Employee Management application",
    },
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
  },
  apis: ["./auth/routes.js", "./swagger.js"],
};
const specs = swaggerJsdoc(options);

module.exports = specs;
