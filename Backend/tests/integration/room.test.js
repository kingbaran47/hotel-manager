import { PostgreSqlContainer } from "@testcontainers/postgresql";
import app from "../../src/app.js";
import request from "supertest";
import { connectTestDB, query, closeTestDB } from "../../src/config/dbTest.js";
import fs from "fs";
import path from "path";

jest.setTimeout(60000)
let container;

beforeAll(async () => {
  // Starting Postgres Container
  container = await new PostgreSqlContainer("postgres:16-alpine")
    .withDatabase("testdb")
    .withUsername("test")
    .withPassword("test")
    .start();

  // Mapping container to pool
  await connectTestDB({
    host: container.getHost(),
    port: container.getPort(),
    user: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
  });

  const migrationFiles = fs.readdirSync(
    path.join(__dirname, "../../migrations")
  ).sort();
  for (const file of migrationFiles) {
    const sql = fs.readFileSync(
      path.join(__dirname, "../../migrations", file),
      "utf-8"
    );
      console.log("Running migration:", file);
      console.log(sql);
    await query(sql);
  }

  
});

afterAll(async () => {
  
  try {
    await closeTestDB();

  await container.stop();
  } catch (error) {
    console.log(error)
  }
  
});

describe("Test Database and APIs", () => {
  it("GET /rooms endpoint should return rooms", async () => {
    const res = await request(app).get("/v1/rooms");
    console.log(res.body)
    expect(res.body.rooms.length).toBeGreaterThan(0);
  });
});
