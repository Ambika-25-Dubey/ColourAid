import express from "express";
import assessmentController from "../../controllers/assessmentController.js";

const router = express.Router();

router.post("/assessments/ishihara", assessmentController.createIshiharaAssessment);
router.get("/assessments", assessmentController.getAllIshiharaAssessments);
router.get("/assessments/:id", assessmentController.getIshiharaAssessmentById);

// 👇 Temporary debug
console.log("Assessment Router Stack:");
router.stack.forEach((layer) => {
  console.log(layer.route?.path, Object.keys(layer.route?.methods || {}));
});

export default router;