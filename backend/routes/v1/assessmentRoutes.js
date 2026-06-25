import express from "express";
import assessmentController from "../../controllers/assessmentController.js";

const router = express.Router();

router.post("/assessments/ishihara", assessmentController.createIshiharaAssessment);

export default router;
