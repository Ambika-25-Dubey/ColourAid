import sqlite3 from "sqlite3";
import { open } from "sqlite";
import env from "../config/env.js";

const sqliteDriver = sqlite3.verbose();

const db = await open({
  filename: env.DATABASE_PATH,
  driver: sqliteDriver.Database,
});

await db.exec("PRAGMA foreign_keys = ON;");

export default db;
