import { getRoomById } from "../../src/controllers/roomsController";
import pool from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

describe("getRoomById", () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    mockRes.status.mockClear();
    mockRes.json.mockClear();
  });

  test("return room by Id successfully", async () => {
    const mockRoom = [
      {
        id: 1,
        size: "suite",
        has_minibar: false,
        is_available: true,
      },
    ];

    pool.query.mockResolvedValue({ rows: mockRoom });

    const mockReq = {
      params: { id: "1" },
    };

    await getRoomById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockRoom[0]);
 
});

 test("fail to find room", async () => {
   

   
    const mockReq = {
      params: { id: "2" },
    };

    pool.query.mockResolvedValue({rows: []})

    await getRoomById(mockReq, mockRes)

    
    
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(mockRes.json).toHaveBeenCalledWith({ "message": "Room does not exist."})

 })




  test("database failed", async () => {
    const mockReq = {
      params: { id: "1" },
    };

    

    const mockNext = jest.fn()
    const mockError = new Error("Database failed")
    
    pool.query.mockRejectedValue(mockError)
    await getRoomById(mockReq, mockRes, mockNext )

    expect(mockNext).toHaveBeenCalledWith(mockError)



  })
});
