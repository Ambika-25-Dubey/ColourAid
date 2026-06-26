import farnsworthModel from "../models/farnsworthModel.js";
import farnsworthService from "./farnsworthService.js";

const saveFarnsworthAssessment = async ({ sessionId, userName, userOrder, metadata }) => {
  const results = farnsworthService.calculateFarnsworthD15Results(userOrder);
  if (!results) {
    throw new Error("Invalid D-15 order payload.");
  }

  const assessmentRecord = {
    session_id: sessionId,
    user_name: userName || null,
    total_error: results.totalError,
    error_margin: results.errorMargin,
    crossing_errors: results.crossingErrors,
    severity: results.severity,
    deficiency_type: results.deficiencyType,
    description: results.description,
    user_order: userOrder,
    metadata: metadata || null,
  };

  const createdAssessment = await farnsworthModel.insertFarnsworthAssessment(assessmentRecord);
  return createdAssessment;
};

const getAllFarnsworthAssessments = async () => {
  const assessments = await farnsworthModel.fetchAllFarnsworthAssessments();
  return assessments;
};

const getFarnsworthAssessmentById = async (id) => {
  const assessment = await farnsworthModel.fetchFarnsworthAssessmentById(id);
  return assessment;
};

const deleteFarnsworthAssessmentById = async (id) => {
  const deleted = await farnsworthModel.deleteFarnsworthAssessmentById(id);
  return deleted;
};

export default {
  saveFarnsworthAssessment,
  getAllFarnsworthAssessments,
  getFarnsworthAssessmentById,
  deleteFarnsworthAssessmentById,
};
