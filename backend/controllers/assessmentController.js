import assessmentService from "../services/assessmentService.js";
import apiResponse from "../utils/apiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";

const createIshiharaAssessment = async (req, res, next) => {
  try {
    const { sessionId, userName, score, answers, metadata } = req.body;

    if (!sessionId || typeof score !== "number" || !Array.isArray(answers)) {
      const error = new Error("Missing or invalid assessment payload.");
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    const createdAssessment = await assessmentService.saveIshiharaAssessment({
      sessionId,
      userName,
      score,
      answers,
      metadata,
    });

    return apiResponse(res, {
      success: true,
      message: MESSAGES.ASSESSMENT_CREATED,
      data: createdAssessment,
      status: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

const getAllIshiharaAssessments = async (req, res, next) => {
  try {
    const assessments = await assessmentService.getAllIshiharaAssessments();

    return apiResponse(res, {
      success: true,
      message: MESSAGES.ASSESSMENTS_FETCHED,
      data: assessments,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getIshiharaAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assessment = await assessmentService.getIshiharaAssessmentById(id);

    if (!assessment) {
      const errorResponse = {
        success: false,
        message: MESSAGES.NOT_FOUND,
        data: null,
        status: HTTP_STATUS.NOT_FOUND,
      };
      return apiResponse(res, errorResponse);
    }

    return apiResponse(res, {
      success: true,
      message: MESSAGES.ASSESSMENT_FETCHED || MESSAGES.ASSESSMENTS_FETCHED,
      data: assessment,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createIshiharaAssessment,
  getAllIshiharaAssessments,
  getIshiharaAssessmentById,
};
