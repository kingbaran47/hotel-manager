import { editRoom } from "../../src/controllers/roomsController";
import pool from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

describe("editRoom", () => {
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

  test("Edit room successfully", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        size: "double",
        has_minibar: true,
        is_available: true,
      },
    };

    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockResolvedValueOnce();

    await editRoom(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Room has been edited.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("Room does not exist", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        size: "double",
        has_minibar: true,
        is_available: true,
      },
    };

    pool.query.mockResolvedValue({ rows: [] });

    await editRoom(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Room does not exist.",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test("Database failed SELECT", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        size: "double",
        has_minibar: true,
        is_available: true,
      },
    };

    const mockError = new Error("SELECT failed");

    pool.query.mockRejectedValue(mockError);

    await editRoom(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  test("Database failed UPDATE", async () => {
    const mockReq = {
      params: { id: "1" },
      body: {
        size: "double",
        has_minibar: true,
        is_available: true,
      },
    };

    const mockError = new Error("UPDATE failed");

    pool.query
      .mockResolvedValueOnce({ rows: [{ id: 1 }] })
      .mockRejectedValue(mockError);

    await editRoom(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalledWith(mockError);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});
