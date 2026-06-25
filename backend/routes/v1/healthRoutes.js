import express from "express";
import apiResponse from "../../utils/apiResponse.js";
import MESSAGES from "../../constants/messages.js";
import HTTP_STATUS from "../../constants/httpStatus.js";

const router = express.Router();

router.get("/health", (req, res) => {
  return apiResponse(res, {
    success: true,
    message: MESSAGES.HEALTH_OK,
    data: {
      application: "ColourAid",
      environment: process.env.NODE_ENV || "development",
    },
    status: HTTP_STATUS.OK,
  });
});

export default router;
