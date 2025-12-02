import pkg from "pg";

const {Pool} = pkg; 

let pool; 

export const connectTestDB = async (config) => {
    pool = new Pool(config);
    await pool.connect();
    return pool;
};


export const query = (text, params) => pool.query(text, params)

export const closeTestDB = async () => {
    if(pool) {
        await pool.end();
        pool = null;
    }
}