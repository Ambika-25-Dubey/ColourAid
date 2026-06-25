import db from "../database/connection.js";
import { randomUUID } from "crypto";

const insertIshiharaAssessment = async ({ session_id, user_name, score, answers, metadata }) => {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  await db.run(
    `INSERT INTO ishihara_assessments (id, session_id, user_name, score, answers, metadata, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    id,
    session_id,
    user_name,
    score,
    answers,
    metadata,
    createdAt
  );

  return {
    id,
    sessionId: session_id,
    userName: user_name,
    score,
    answers: JSON.parse(answers),
    metadata: metadata ? JSON.parse(metadata) : null,
    createdAt,
  };
};

const fetchAllIshiharaAssessments = async () => {
  const rows = await db.all(
    `SELECT id, session_id, user_name, score, answers, metadata, created_at
     FROM ishihara_assessments
     ORDER BY created_at DESC;`
  );

  return rows.map((row) => ({
    id: row.id,
    sessionId: row.session_id,
    userName: row.user_name,
    score: row.score,
    answers: JSON.parse(row.answers),
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    createdAt: row.created_at,
  }));
};

const fetchIshiharaAssessmentById = async (id) => {
  const row = await db.get(
    `SELECT id, session_id, user_name, score, answers, metadata, created_at
     FROM ishihara_assessments
     WHERE id = ?;`,
    id
  );

  if (!row) return null;

  return {
    id: row.id,
    sessionId: row.session_id,
    userName: row.user_name,
    score: row.score,
    answers: JSON.parse(row.answers),
    metadata: row.metadata ? JSON.parse(row.metadata) : null,
    createdAt: row.created_at,
  };
};

export default {
  insertIshiharaAssessment,
  fetchAllIshiharaAssessments,
  fetchIshiharaAssessmentById,
};
