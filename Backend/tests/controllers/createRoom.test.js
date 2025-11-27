import { createRoom } from "../../src/controllers/roomsController";
import pool from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

describe("createRoom", () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    mockRes.status.mockClear();
    mockRes.json.mockClear();
  });

  test("create room successfully", async () => {
    const mockReq = {
      body: {
        size: "double",
        has_minibar: true,
      },
    };

    pool.query.mockResolvedValue({ rows: [{ id: 10 }] });

    await createRoom(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201)
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Room has been created.",
      id: 10,
    });
  });

  test("Database failed", async () => {
    const mockReq = {
      body: {
        size: "double",
        has_minibar: true,
      },
    };
    const mockNext = jest.fn()
    const mockError = new Error("Database failed")
    pool.query.mockRejectedValue(mockError);
    await createRoom(mockReq, mockRes, mockNext)
    expect(mockNext).toHaveBeenCalledWith(mockError)


  })


});
