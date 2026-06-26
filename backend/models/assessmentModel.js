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

const fetchAllIshiharaAssessments = async (sessionId) => {
  let query = `SELECT id, session_id, user_name, score, answers, metadata, created_at
               FROM ishihara_assessments`;
  const params = [];
  if (sessionId) {
    query += ` WHERE session_id = ?`;
    params.push(sessionId);
  }
  query += ` ORDER BY created_at DESC;`;

  const rows = await db.all(query, ...params);

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

const deleteIshiharaAssessmentById = async (id) => {
  const result = await db.run(
    `DELETE FROM ishihara_assessments
     WHERE id = ?;`,
    id
  );

  return result.changes > 0;
};

export default {
  insertIshiharaAssessment,
  fetchAllIshiharaAssessments,
  fetchIshiharaAssessmentById,
  deleteIshiharaAssessmentById,
};
