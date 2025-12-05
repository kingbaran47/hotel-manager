import fs from "fs";
import path from "path";
import request from "supertest";
import { Pool } from "pg";
import { createApp } from "../../src/app.js";
import createRoomsService from "../../src/services/roomService.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const roomsService = createRoomsService(pool);
const app = createApp(pool);

const migrationsDir = path.join(__dirname, "../../migrations");
const initFile = path.join(migrationsDir, "001_init.sql");
const seedFile = path.join(migrationsDir, "002_seed_rooms.sql");


async function runSqlFile(filePath) {
  const sql = fs
    .readFileSync(filePath, "utf-8")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const stmt of sql) {
    await pool.query(stmt);
  }
}

beforeAll(async () => {

  await runSqlFile(initFile);
});

beforeEach(async () => {
 
  await pool.query("TRUNCATE TABLE rooms RESTART IDENTITY CASCADE");


  await runSqlFile(seedFile);
});

afterAll(async () => {
  await pool.end();
});

describe("Rooms API Integration", () => {
  it("should return all rooms via service", async () => {
    const rooms = await roomsService.getAllRooms();
    expect(rooms.length).toBe(3);
  });

  it("should have a suite room via service", async () => {
    const suiteRoom = (
      await pool.query("SELECT * FROM rooms WHERE size='suite'")
    ).rows[0];
    expect(suiteRoom).toBeDefined();
    expect(suiteRoom.has_minibar).toBe(false);
  });

  it("should return rooms via API endpoint", async () => {
    const res = await request(app).get("/v1/rooms");
    expect(res.statusCode).toBe(200);
    expect(res.body.rooms.length).toBe(3);
  });
});
