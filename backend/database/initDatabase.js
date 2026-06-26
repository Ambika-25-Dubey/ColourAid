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

const createFarnsworthAssessmentsTable = `
CREATE TABLE IF NOT EXISTS farnsworth_assessments (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_name TEXT,
  total_error INTEGER NOT NULL,
  error_margin INTEGER NOT NULL,
  crossing_errors INTEGER NOT NULL,
  severity INTEGER NOT NULL,
  deficiency_type TEXT NOT NULL,
  description TEXT NOT NULL,
  user_order TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

const normalizeOldFarnsworthTypes = `
UPDATE farnsworth_assessments
SET deficiency_type = CASE
  WHEN deficiency_type = 'none' THEN 'normal'
  WHEN deficiency_type IN ('protan_deutan', 'red-green') THEN 'possible_red_green'
  WHEN deficiency_type IN ('tritan', 'blue-yellow') THEN 'possible_blue_yellow'
  ELSE deficiency_type
END
WHERE deficiency_type IN ('none', 'protan_deutan', 'red-green', 'tritan', 'blue-yellow');
`;

async function initializeDatabase() {
  await db.exec(createIshiharaAssessmentsTable);
  await db.exec(createFarnsworthAssessmentsTable);
  await db.exec(normalizeOldFarnsworthTypes);
}

export default initializeDatabase;
