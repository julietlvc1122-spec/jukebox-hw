import "dotenv/config";
import pg from "pg";
console.log("DATABASE_URL loaded:", Boolean(process.env.DATABASE_URL));
const db = new pg.Client(process.env.DATABASE_URL);
export default db;
