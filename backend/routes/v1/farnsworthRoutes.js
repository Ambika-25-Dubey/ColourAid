import express from "express";
import farnsworthController from "../../controllers/farnsworthController.js";

const router = express.Router();

router.post("/assessments/farnsworth", farnsworthController.createFarnsworthAssessment);
router.get("/assessments/farnsworth", farnsworthController.getAllFarnsworthAssessments);
router.get("/assessments/farnsworth/:id", farnsworthController.getFarnsworthAssessmentById);
router.delete("/assessments/farnsworth/:id", farnsworthController.deleteFarnsworthAssessmentById);

export default router;
