import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 3000),
  db: {
    host: process.env.DB_HOST || "db",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "app_user",
    password: process.env.DB_PASSWORD || "app_password",
    database: process.env.DB_NAME || "default_db"
  }
};
