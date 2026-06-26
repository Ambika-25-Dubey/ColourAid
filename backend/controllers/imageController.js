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

const serveImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const imagePath = await imageService.findImagePath(filename);

    if (!imagePath) {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.IMAGE_NOT_FOUND,
        data: null,
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    return res.sendFile(imagePath, (err) => {
      if (err) {
        next(err);
      }
    });
  } catch (error) {
    if (error.message === "Invalid filename.") {
      return apiResponse(res, {
        success: false,
        message: MESSAGES.IMAGE_INVALID_FILENAME,
        data: null,
        status: HTTP_STATUS.BAD_REQUEST,
      });
    }
    next(error);
  }
};

export default {
  uploadImage,
  serveImage,
};
