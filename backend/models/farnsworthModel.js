import db from "../database/connection.js";
import { randomUUID } from "crypto";

const normalizeDeficiencyType = (type) => {
  switch (type) {
    case 'none':
      return 'normal';
    case 'protan_deutan':
    case 'red-green':
      return 'possible_red_green';
    case 'tritan':
    case 'blue-yellow':
      return 'possible_blue_yellow';
    default:
      return type;
  }
};

const insertFarnsworthAssessment = async ({ session_id, user_name, total_error, error_margin, crossing_errors, severity, deficiency_type, description, user_order, metadata }) => {
  const normalizedType = normalizeDeficiencyType(deficiency_type);
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  await db.run(
    `INSERT INTO farnsworth_assessments (
      id,
      session_id,
      user_name,
      total_error,
      error_margin,
      crossing_errors,
      severity,
      deficiency_type,
      description,
      user_order,
      metadata,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    id,
    session_id,
    user_name,
    total_error,
    error_margin,
    crossing_errors,
    severity,
    normalizedType,
    description,
    JSON.stringify(user_order),
    metadata ? JSON.stringify(metadata) : null,
    createdAt
  );

  return {
    id,
    sessionId: session_id,
    userName: user_name,
    totalError: total_error,
    errorMargin: error_margin,
    crossingErrors: crossing_errors,
    severity,
    deficiencyType: normalizedType,
    description,
    userOrder: user_order,
    metadata: metadata ? JSON.parse(metadata) : null,
    createdAt,
  };
};

const fetchAllFarnsworthAssessments = async () => {
  const rows = await db.all(
    `SELECT id, session_id, user_name, total_error, error_margin, crossing_errors, severity, deficiency_type, description, user_order, metadata, created_at
     FROM farnsworth_assessments
     ORDER BY created_at DESC;`
  );

  return rows.map((row) => ({
    id: row.id,
    sessionId: row.session_id,
    userName: row.user_name,
    totalError: row.total_error,
    errorMargin: row.error_margin,
    crossingErrors: row.crossing_errors,
    severity: row.severity,
    deficiencyType: normalizeDeficiencyType(row.deficiency_type),
    description: row.description,
    userOrder: JSON.parse(row.user_order),
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    createdAt: row.created_at,
  }));
};

const fetchFarnsworthAssessmentById = async (id) => {
  const row = await db.get(
    `SELECT id, session_id, user_name, total_error, error_margin, crossing_errors, severity, deficiency_type, description, user_order, metadata, created_at
     FROM farnsworth_assessments
     WHERE id = ?;`,
    id
  );

  if (!row) return null;

  return {
    id: row.id,
    sessionId: row.session_id,
    userName: row.user_name,
    totalError: row.total_error,
    errorMargin: row.error_margin,
    crossingErrors: row.crossing_errors,
    severity: row.severity,
    deficiencyType: normalizeDeficiencyType(row.deficiency_type),
    description: row.description,
    userOrder: JSON.parse(row.user_order),
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    createdAt: row.created_at,
  };
};

const deleteFarnsworthAssessmentById = async (id) => {
  const result = await db.run(
    `DELETE FROM farnsworth_assessments WHERE id = ?;`,
    id
  );
  return result.changes > 0;
};

export default {
  insertFarnsworthAssessment,
  fetchAllFarnsworthAssessments,
  fetchFarnsworthAssessmentById,
  deleteFarnsworthAssessmentById,
};
