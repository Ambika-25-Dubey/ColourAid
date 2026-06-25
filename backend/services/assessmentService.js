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

const getAllIshiharaAssessments = async () => {
  const assessments = await assessmentModel.fetchAllIshiharaAssessments();
  return assessments;
};

const getIshiharaAssessmentById = async (id) => {
  const assessment = await assessmentModel.fetchIshiharaAssessmentById(id);
  return assessment;
};

export default {
  saveIshiharaAssessment,
  getAllIshiharaAssessments,
  getIshiharaAssessmentById,
};
