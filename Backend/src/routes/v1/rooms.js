// routes/v1/rooms.js
import express from "express";

export const createRoomsRouter = (controllers) => {
  const router = express.Router();

  /**
   * @openapi
   * /v1/rooms:
   *   get:
   *     summary: Get all rooms
   *     tags:
   *       - Rooms
   *     responses:
   *       200:
   *         description: Returns all rooms
   */
  router.get("/", controllers.getAllRooms);

  



 /**
 * @openapi
 * /v1/rooms/{id}:
 *   get:
 *     summary: Get a room by Id
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room found
 *       404:
 *         description: Room does not exist
 */
  router.get("/:id", controllers.getRoomById);









/**
   * @openapi
   * /v1/rooms/create:
   *   post:
   *     summary: Create a new room
   *     tags:
   *       - Rooms
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - size
   *               - has_minibar
   *             properties:
   *               size:
   *                 type: string
   *                 enum: [single, double, suite]
   *               has_minibar:
   *                 type: boolean
   *     responses:
   *       201:
   *         description: Room created
   */
  router.post("/create", controllers.createRoom);








  
  /**
   * @openapi
   * /v1/rooms/{id}:
   *   delete:
   *     summary: Delete a room
   *     tags:
   *       - Rooms
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Room deleted
   *       404:
   *         description: Room not found
   */
  router.delete("/:id", controllers.deleteRoom);







/**
   * @openapi
   * /v1/rooms/{id}:
   *   put:
   *     summary: Update a room
   *     tags:
   *       - Rooms
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - size
   *               - has_minibar
   *               - is_available
   *             properties:
   *               size:
   *                 type: string
   *                 enum: [single, double, suite]
   *               has_minibar:
   *                 type: boolean
   *               is_available:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Room updated
   *       404:
   *         description: Room not found
   */
  router.put("/:id", controllers.editRoom);

  return router;
};

