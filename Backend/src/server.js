import dotenv from "dotenv";
dotenv.config();
import {createApp} from "./app.js";

import pool from './config/db.js';

const PORT=process.env.PORT || 3000;


const app = createApp(pool)
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})