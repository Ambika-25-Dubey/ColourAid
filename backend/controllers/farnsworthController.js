import farnsworthAnalysisService from "../services/farnsworthAnalysisService.js";
import apiResponse from "../utils/apiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";

const createFarnsworthAssessment = async (req, res, next) => {
  try {
    const { sessionId, userName, userOrder, metadata } = req.body;

    if (!sessionId || !Array.isArray(userOrder) || userOrder.length < 2) {
      const error = new Error("Missing or invalid Farnsworth D-15 payload.");
      error.status = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    const createdAssessment = await farnsworthAnalysisService.saveFarnsworthAssessment({
      sessionId,
      userName,
      userOrder,
      metadata,
    });

    return apiResponse(res, {
      success: true,
      message: MESSAGES.FARNSWORTH_ASSESSMENT_CREATED,
      data: createdAssessment,
      status: HTTP_STATUS.CREATED,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFarnsworthAssessments = async (req, res, next) => {
  try {
    const assessments = await farnsworthAnalysisService.getAllFarnsworthAssessments();
    return apiResponse(res, {
      success: true,
      message: MESSAGES.FARNSWORTH_ASSESSMENTS_FETCHED,
      data: assessments,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getFarnsworthAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assessment = await farnsworthAnalysisService.getFarnsworthAssessmentById(id);

    if (!assessment) {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.FARNSWORTH_ASSESSMENT_NOT_FOUND,
        data: null,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return apiResponse(res, {
      success: true,
      message: MESSAGES.FARNSWORTH_ASSESSMENT_FETCHED,
      data: assessment,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFarnsworthAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await farnsworthAnalysisService.deleteFarnsworthAssessmentById(id);

    if (!deleted) {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.FARNSWORTH_ASSESSMENT_NOT_FOUND,
        data: null,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return apiResponse(res, {
      success: true,
      message: MESSAGES.FARNSWORTH_ASSESSMENT_DELETED,
      data: null,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createFarnsworthAssessment,
  getAllFarnsworthAssessments,
  getFarnsworthAssessmentById,
  deleteFarnsworthAssessmentById,
};
