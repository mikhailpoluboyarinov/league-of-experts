import mysql from "mysql2/promise";
import { config } from "./config.js";

export const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10
});

export const waitForDb = async (attempts = 30, delayMs = 2000) => {
  for (let i = 0; i < attempts; i += 1) {
    try {
      await pool.query("SELECT 1");
      return;
    } catch (error) {
      if (i === attempts - 1) {
        throw error;
      }
      await new Promise((resolve) => {
        setTimeout(resolve, delayMs);
      });
    }
  }
};
