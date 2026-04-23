import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import { pool, waitForDb } from "./db.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "db_unavailable" });
  }
});

const createTableEndpoint = (path, tableName) => {
  app.get(path, async (_req, res, next) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
      res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  });
};

createTableEndpoint("/api/users", "users");
createTableEndpoint("/api/matches", "matches");
createTableEndpoint("/api/predictions", "predictions");
createTableEndpoint("/api/results", "results");
createTableEndpoint("/api/countries", "countries");
createTableEndpoint("/api/misc", "miscs");

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

const bootstrap = async () => {
  await waitForDb();
  app.listen(config.port, () => {
    console.log(`Backend listening on port ${config.port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
