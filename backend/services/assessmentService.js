import assessmentModel from "../models/assessmentModel.js";

const saveIshiharaAssessment = async ({ sessionId, userName, score, answers, metadata }) => {
  const assessmentRecord = {
    session_id: sessionId,
    user_name: userName || null,
    score,
    answers: JSON.stringify(answers),
    metadata: metadata ? JSON.stringify(metadata) : null,
  };

  const createdAssessment = await assessmentModel.insertIshiharaAssessment(assessmentRecord);
  return createdAssessment;
};

export default {
  saveIshiharaAssessment,
};
