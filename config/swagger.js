// Swagger configuration for API documentation

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NBA Higher or Lower API",
      version: "1.0.0",
      description:
        "NBA Higher or Lower is a web-based game where users guess which NBA player has higher stats in categories like career points per game (PPG), field goal percentage (FG%), three-point percentage (3PT%), or 2K ratings. Made by Kaspar Koorits and Jakob Kaur Kelder.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
