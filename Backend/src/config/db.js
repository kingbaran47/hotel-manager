import pkg from "pg";
const { Pool, Client } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
})

pool.connect()
    .then(client => {
        console.log("CONNECTED SUCCESSFULLY");
        client.release();
    })
    .catch(err => console.log("SOMETHING WENT WRONG:", err));

// Fill the database with 3 specific rooms only if its empty
const fillTestData = async () => {
    try {
        const {rows} = await pool.query('SELECT COUNT(*) FROM rooms');
        const count = parseInt(rows[0].count);
        
        if(count === 0) {
            await pool.query(`
            INSERT INTO rooms ("size", "has_minibar", "is_available") VALUES 
            ('double', true, true),
            ('single', true, true),
            ('suite', false, true)
             `)
             console.log("Added 3 rooms.")
        } else {
            console.log("Rooms already exists.")
        }
    } catch(err) {
        console.log("There was an error: ", err.message)
    }
}

fillTestData();

export default pool;