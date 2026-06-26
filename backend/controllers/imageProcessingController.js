import apiResponse from "../utils/apiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";
import daltonizationService from "../services/daltonizationService.js";

const processImage = async (req, res, next) => {
  try {
    const file = req.file;
    const { type, action } = req.body;

    if (!file) {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.FILE_MISSING,
        data: null,
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const result = await daltonizationService.processImage(file, type, action);

    return apiResponse(res, {
      success: true,
      message: MESSAGES.IMAGE_PROCESSED,
      data: result,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  processImage,
};
