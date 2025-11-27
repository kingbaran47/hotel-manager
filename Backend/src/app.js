import express from "express";
import cors from "cors";
import roomsRouter from "./routes/v1/rooms.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1/rooms", roomsRouter);


app.use((error, req, res, next) => {
    console.log(error.message)
    error.statusCode = error.statusCode || '500';
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
})


export default app;
