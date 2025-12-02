import roomService from "../services/roomService.js";

export const roomController = (roomService) => ({



    getAllRooms: async (req, res, next) => {
        try {
            const rooms = await roomService.getAllRooms();
            res.status(200).json({rooms});
        } catch (error) {
            next(error);
        }
    },

    getRoomById: async (req, res, next) => {
    try {
      const room = await roomService.getRoomById(req.params.id);
      if (!room) return res.status(404).json({ message: "Room does not exist." });
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  },

  createRoom: async (req, res, next) => {
    try {
      const newId = await roomService.createRoom(req.body);
      res.status(201).json({ message: "Room has been created.", id: newId });
    } catch (error) {
      next(error);
    }
  },

  deleteRoom: async (req, res, next) => {
    try {
      const deleted = await roomService.deleteRoom(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Room does not exist." });
      res.status(200).json({ message: "Room has been deleted." });
    } catch (error) {
      next(error);
    }
  },

  editRoom: async (req, res, next) => {
    try {
      const updated = await roomService.editRoom(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Room does not exist." });
      res.status(200).json({ message: "Room has been edited." });
    } catch (error) {
      next(error);
    }
  }





})


