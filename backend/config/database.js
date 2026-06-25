import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const dbConfig = {
  client: process.env.DB_CLIENT || "sqlite3",
  connection: {
    filename:
      process.env.DB_FILENAME || path.join(__dirname, "../database/colouraid.db"),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, "../database/migrations"),
  },
};

export default dbConfig;
