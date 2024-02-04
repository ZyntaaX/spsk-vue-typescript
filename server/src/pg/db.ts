import { Pool, QueryResult } from 'pg';
import dotenv from 'dotenv';

// For env File 
dotenv.config();

const pool = new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE
});

const query = async (query: string, params: any): Promise<QueryResult> => {
    return pool.query(query, params);
};

export { query };
