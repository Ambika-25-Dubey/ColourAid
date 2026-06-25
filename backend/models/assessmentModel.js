import db from "../database/connection.js";
import { randomUUID } from "crypto";

const insertIshiharaAssessment = async ({ session_id, user_name, score, answers, metadata }) => {
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  const result = await db.run(
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

export default {
  insertIshiharaAssessment,
};
