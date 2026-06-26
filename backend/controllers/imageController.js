import apiResponse from "../utils/apiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";
import imageService from "../services/imageService.js";

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.FILE_MISSING,
        data: null,
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }

    const savedFile = await imageService.saveUploadedImage(file);

    return apiResponse(res, {
      success: true,
      message: MESSAGES.IMAGE_UPLOADED,
      data: savedFile,
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  uploadImage,
};
