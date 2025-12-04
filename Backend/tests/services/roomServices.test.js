import roomService from "../../src/services/roomService.js";

//getAllRooms
test("getAllRooms returns all rooms", async () => {
    const mockDbPool = {
        query: jest.fn().mockResolvedValue({rows: [{id: 1, size: "suite", has_minibar: false, is_available: false}]})
    }
    const service = roomService(mockDbPool)
    const result = await service.getAllRooms()
    expect(result).toEqual([{id: 1, size: "suite", has_minibar: false, is_available: false}])
    expect(mockDbPool.query).toHaveBeenCalledWith("SELECT * FROM rooms")

   
    
})

test("should propagate errors from database", async () => {
    const mockDbPool = {
        query: jest.fn()
    }
    const mockError = new Error("Database failed.");
    mockDbPool.query.mockRejectedValue(mockError);
    const service = roomService(mockDbPool)
    await expect(service.getAllRooms()).rejects.toThrow("Database failed.")
})

//getRoomById
test("getRoomById", async () => {
    const mockDbPool = {
        query: jest.fn().mockResolvedValue({rows: [{id: 1, size: "suite", has_minibar: false, is_available: false}]})
    }
    const service = roomService(mockDbPool)
    const result = await service.getRoomById(1)
    expect(result).toEqual({id: 1, size: "suite", has_minibar: false, is_available: false})
    expect(mockDbPool.query).toHaveBeenCalledWith("SELECT * FROM rooms WHERE id=$1", [1])

})

test("getRoomById database crashed", async () => {
    const mockDbPool = {
        query: jest.fn()
    }
    const mockError = new Error("Database failed.");
    mockDbPool.query.mockRejectedValue(mockError);
    const service = roomService(mockDbPool)
    await expect(service.getRoomById(1)).rejects.toThrow("Database failed.")
})

//createRoom
test("createRoom", async () => {
    const mockDbPool = {
        query: jest.fn().mockResolvedValue({rows: [{id: 1}]})
    }
    const service = roomService(mockDbPool);
    const result = await service.createRoom({size: "suite", has_minibar: false});
    expect(result).toEqual(1)
    expect(mockDbPool.query).toHaveBeenCalledWith("INSERT INTO rooms (size, has_minibar, is_available) VALUES ($1, $2, true) RETURNING id",
      ["suite", false])
})

test("createRoom database crashed", async () => {
    const mockDbPool = {
        query: jest.fn()
    }
    const mockError = new Error("Database failed.");
    mockDbPool.query.mockRejectedValue(mockError);
    const service = roomService(mockDbPool)
    await expect(service.createRoom({size: "suite", has_minibar: false})).rejects.toThrow("Database failed.")
})

//deleteRoom
test("deleteRoom", async () => {
    const mockDbPool = {
        query: jest.fn()
        .mockResolvedValueOnce({rows: [{id: 1, has_minibar: false, is_available: false}]})
        .mockResolvedValueOnce({})
    };
    const service = roomService(mockDbPool);
    const result = await service.deleteRoom(1)
    expect(result).toEqual(true);
    expect(mockDbPool.query).toHaveBeenCalledWith("SELECT * FROM rooms WHERE id=$1", [1])
    expect(mockDbPool.query).toHaveBeenCalledWith("DELETE FROM rooms WHERE id=$1", [1])
})

test("deleteRoom Room does not exist", async () => {
    const mockDbPool = {
        query: jest.fn()
        .mockResolvedValueOnce({rows: []})
        
    };
    const service = roomService(mockDbPool);
    const result = await service.deleteRoom(1)
    expect(result).toEqual(false);
})

test("deleteRoom database crashed", async () => {
    const mockDbPool = {
        query: jest.fn()
    }
    const mockError = new Error("Database failed.");
    mockDbPool.query.mockRejectedValue(mockError);
    const service = roomService(mockDbPool)
    await expect(service.deleteRoom(1)).rejects.toThrow("Database failed.")
})

//editRoom
test("editRoom", async () => {
    const mockDB = {
        query: jest.fn()
            .mockResolvedValueOnce({rows: [{id: 1, size: "suite", has_minibar: false, is_available: false}]})
            .mockResolvedValueOnce({})
        };

    const service = roomService(mockDB)
    const result = await service.editRoom(1, {size: "suite", has_minibar: false, is_available: false})
    expect(result).toEqual(true)
    expect(mockDB.query).toHaveBeenCalledWith("SELECT * FROM rooms WHERE id=$1", [1])
    expect(mockDB.query).toHaveBeenCalledWith("UPDATE rooms SET size=$1, has_minibar=$2, is_available=$3 WHERE id=$4",
      ["suite", false, false, 1])
})


test("editRoom database crashed", async () => {
    const mockDbPool = {
        query: jest.fn()
    }
    const mockError = new Error("Database failed.");
    mockDbPool.query.mockRejectedValue(mockError);
    const service = roomService(mockDbPool)
    await expect(service.editRoom(1, {size: "suite", has_minibar: false, is_available: false})).rejects.toThrow("Database failed.")
})

test("editRoom", async () => {
    const mockDB = {
        query: jest.fn()
            .mockResolvedValueOnce({rows: []})
        };
    const service = roomService(mockDB)
    const result = await service.editRoom(1, {size: "suite", has_minibar: false, is_available: false})
    expect(result).toEqual(false)
    expect(mockDB.query).toHaveBeenCalledWith("SELECT * FROM rooms WHERE id=$1", [1])
   
})








