import { getAllRooms } from "../../src/controllers/roomsController";
import pool from "../../src/config/db";

jest.mock("../../src/config/db", () => ({
    query: jest.fn(),
}));


describe("getAllRooms controller", () => {


    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };


    

    beforeEach(() => {
        mockRes.status.mockClear();
        mockRes.json.mockClear();
    });



    test("return all users successfully", async () => {
        const mockReq = {}
        const mockRooms = Array.from({length: 30}, (_, i) => ({
            id: i,
            size: "single",
            has_minibar: Math.random() < 0.5,
            is_available: Math.random() < 0.5
            
        }))

        pool.query.mockResolvedValue({rows: mockRooms})

        await getAllRooms(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({rooms:mockRooms})



    })



})