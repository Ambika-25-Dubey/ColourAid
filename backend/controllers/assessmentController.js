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

export default {
  createIshiharaAssessment,
};
