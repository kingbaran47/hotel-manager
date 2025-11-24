import express from "express";
import {getAllRooms, getRoomById, createRoom, deleteRoom, editRoom} from "../../controllers/roomsController.js";
const router = express.Router();

// Route fetch all rooms
router.get("/", getAllRooms)

// Route fetch room by Id
router.get("/:id", getRoomById)

// Route create room
router.post("/create", createRoom)

// Route delete room by Id
router.delete("/:id", deleteRoom)

// Route update room by Id
router.put("/:id", editRoom)

export default router;