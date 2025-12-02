import express from "express";
import cors from "cors";
import { createRoomsRouter } from "./routes/v1/rooms.js";
import roomService from "./services/roomService.js";
import { roomController } from "./controllers/roomsController.js";

import * as roomsControllers from "./controllers/roomsController.js";

export const createApp = (dbPool) => {
  const app = express();

  app.use(cors());
  app.use(express.json());


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
