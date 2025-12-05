import express from "express";
import cors from "cors";
import { createRoomsRouter } from "./routes/v1/rooms.js";
import roomService from "./services/roomService.js";
import { roomController } from "./controllers/roomsController.js";
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"


export const createApp = (dbPool) => {
  const app = express();

  app.use(cors());
  app.use(express.json());


  // Swagger setup
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "eXXellent API",
        version: "1.0.0",
        description: "API documentation for the Hotel Room Serivce"
      },
    },
    apis: ["./src/routes/**/*.js"]
  };

  const openapiSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec))




  // Put database pool into services
  const roomServiceInstance = roomService(dbPool); 

  // Put services into controllers 
  const roomControllerInstance = roomController(roomServiceInstance)


  app.use("/v1/rooms", createRoomsRouter(roomControllerInstance));

  app.use((error, req, res, next) => {
    console.log(error.message);
    error.statusCode = error.statusCode || "500";
    error.status = error.status || "error";
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  });

  return app;
};
