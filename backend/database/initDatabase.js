import db from "./connection.js";

const createIshiharaAssessmentsTable = `
CREATE TABLE IF NOT EXISTS ishihara_assessments (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_name TEXT,
  score INTEGER NOT NULL,
  answers TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

async function initializeDatabase() {
  await db.exec(createIshiharaAssessmentsTable);
}

export default initializeDatabase;
