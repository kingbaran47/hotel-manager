import { createRoom, deleteRoom } from "../../src/controllers/roomsController";
import pool from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

describe("delete room", () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

  beforeEach(() => {
    mockRes.status.mockClear();
    mockRes.json.mockClear();
    mockNext.mockClear();
  });

  test("creat room successfully", async () => {
    const mockReq = {
      params: { id: "1" },
    };

    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce({});

    await deleteRoom(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Room has been deleted.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("Room not found", async () => {
    const mockReq = {
      params: { id: "1" },
    };

    pool.query.mockResolvedValueOnce({ rows: [] });

    await deleteRoom(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Room does not exist.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("Database fail SELECT", async () => {
    const mockReq = {
      params: { id: "1" },
    };
    const mockError = new Error("SELECT failed");

    pool.query.mockRejectedValue(mockError);

    await deleteRoom(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  test("Database fail DELETE", async () => {
    const mockReq = {
      params: { id: "1" },
    };

    const mockError = new Error("DELETE failed");

    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockRejectedValue(mockError);

    await deleteRoom(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});
