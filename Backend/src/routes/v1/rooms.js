// routes/v1/rooms.js
import express from "express";

export const createRoomsRouter = (controllers) => {
  const router = express.Router();

  // Route fetch all rooms
  router.get("/", controllers.getAllRooms);

  // Route fetch room by Id
  router.get("/:id", controllers.getRoomById);

  // Route create room
  router.post("/create", controllers.createRoom);

  // Route delete room by Id
  router.delete("/:id", controllers.deleteRoom);

  // Route update room by Id
  router.put("/:id", controllers.editRoom);

  return router;
};

