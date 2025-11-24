import express from "express";
import cors from "cors";
import roomsRouter from "./routes/v1/rooms.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/rooms", roomsRouter);

export default app;
