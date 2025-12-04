import { roomController } from "../../src/controllers/roomsController";

//test getAllRooms
test("getAllRooms", async () => {
  const mockService = {
    getAllRooms: jest
      .fn()
      .mockResolvedValue([
        { id: 1, size: "suite", has_minibar: false, is_available: false },
      ]),
  };

  const res = {
    status: jest.fn().mockReturnThis(), //prevents breaking chain
    json: jest.fn(),
  };
  const next = jest.fn();

  const req = {};

  const controller = roomController(mockService);
  await controller.getAllRooms(req, res, next);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    rooms: [{ id: 1, size: "suite", has_minibar: false, is_available: false }],
  });
});

test("getAllRooms query crashed", async () => {
  const mockError = new Error("Query failed.");
  const mockService = {
    getAllRooms: jest.fn().mockRejectedValue(mockError),
  };
  const res = {
    status: jest.fn().mockReturnThis(), //prevents breaking chain
    json: jest.fn(),
  };
  const req = {};
  const mockNext = jest.fn();
  const controller = roomController(mockService);
  await controller.getAllRooms(req, res, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});
//test getRoomById
test("getRoomById", async () => {
  const mockService = {
    getRoomById: jest
      .fn()
      .mockResolvedValue({
        id: 1,
        size: "suite",
        has_minibar: false,
        is_available: false,
      }),
  };

  const res = {
    status: jest.fn().mockReturnThis(), //prevents breaking chain
    json: jest.fn(),
  };
  const next = jest.fn();

  const req = {
    params: {
      id: "1",
    },
  };

  const controller = roomController(mockService);
  await controller.getRoomById(req, res, next);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    id: 1,
    size: "suite",
    has_minibar: false,
    is_available: false,
  });
});

test("getRoomById room does not exist", async () => {
  const mockService = {
    getRoomById: jest.fn().mockResolvedValue(null), //so !room works
  };
  const res = {
    status: jest.fn().mockReturnThis(), //prevents breaking chain
    json: jest.fn(),
  };
  const next = jest.fn();

  const req = {
    params: {
      id: "1",
    },
  };

  const controller = roomController(mockService);
  await controller.getRoomById(req, res, next);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({message: "Room does not exist."})
});

test("getRoomById query crashed", async () => {
  const mockError = new Error("Query failed.");
  const mockService = {
    getRoomById: jest.fn().mockRejectedValue(mockError),
  };
  const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
 const req = {
    params: {
      id: "1",
    },
  };
  const mockNext = jest.fn();
  const controller = roomController(mockService);
  await controller.getRoomById(req, res, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});

//test createRoom
test("createRoom successfully", async () => {
     const mockService = {
    createRoom: jest
      .fn()
      .mockResolvedValue(1),
  };

  const res = {
    status: jest.fn().mockReturnThis(), //prevents breaking chain
    json: jest.fn(),
  };
  const next = jest.fn();

  const req = {
    body: {
      size: "suite",
      has_minibar: false,
      is_available: true
    },
  };

  const controller = roomController(mockService);
  await controller.createRoom(req, res, next);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({message: "Room has been created.", id: 1 })

})

test("createRoom query crashed", async () => {
  const mockError = new Error("Query failed.");
  const mockService = {
    createRoom: jest.fn().mockRejectedValue(mockError),
  };
  const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
 const req = {
  
    body: {
      size: "suite",
      has_minibar: false,
      is_available: true
    },
  };
  const mockNext = jest.fn();
  const controller = roomController(mockService);
  await controller.createRoom(req, res, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});

//test deleteRoom
test("deleteRoom successfully", async () => {
    const mockService = {
        deleteRoom: jest.fn().mockResolvedValue(true) 
    }
     const mockNext = jest.fn();
     const req = {
    params: {
      id: "1",
    },
  };
 const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
const controller = roomController(mockService);
  await controller.deleteRoom(req, res, mockNext);
   expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: "Room has been deleted." })

})

test("deleteRoom room does not exist", async () => {
    const mockService = {
        deleteRoom: jest.fn().mockResolvedValue(false) 
    }
     const mockNext = jest.fn();
     const req = {
    params: {
      id: "1",
    },
  };
 const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
const controller = roomController(mockService);
  await controller.deleteRoom(req, res, mockNext);
   expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: "Room does not exist." })

})

test("deleteRoom query crashed", async () => {
  const mockError = new Error("Query failed.");
  const mockService = {
    deleteRoom: jest.fn().mockRejectedValue(mockError),
  };
  const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
  const req = {
    params: {
      id: "1",
    }}
  const mockNext = jest.fn();
  const controller = roomController(mockService);
  await controller.deleteRoom(req, res, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});

// test editRoom
test("editRoom successfully", async () => {
    const mockService = {
        editRoom: jest.fn().mockResolvedValue(true) 
    }
     const mockNext = jest.fn();
     const req = {
    params: {
      id: "1",
    },
    body: {
         size: "suite",
      has_minibar: false,
      is_available: true
    }
  };
 const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
const controller = roomController(mockService);
  await controller.editRoom(req, res, mockNext);
   expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: "Room has been edited." })

})

// test editRoom
test("editRoom room does not exist", async () => {
    const mockService = {
        editRoom: jest.fn().mockResolvedValue(false) 
    }
     const mockNext = jest.fn();
     const req = {
    params: {
      id: "1",
    },
    body: {
         size: "suite",
      has_minibar: false,
      is_available: true
    }
  };
 const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
const controller = roomController(mockService);
  await controller.editRoom(req, res, mockNext);
   expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: "Room does not exist." })

})
test("deleteRoom query crashed", async () => {
  const mockError = new Error("Query failed.");
  const mockService = {
    editRoom: jest.fn().mockRejectedValue(mockError),
  };
  const res = {
    status: jest.fn().mockReturnThis(), 
    json: jest.fn(),
  };
  const req = {
    params: {
      id: "1",
    },
 body: {
         size: "suite",
      has_minibar: false,
      is_available: true
    }}
  const mockNext = jest.fn();
  const controller = roomController(mockService);
  await controller.editRoom(req, res, mockNext);
  expect(mockNext).toHaveBeenCalledWith(mockError);
});