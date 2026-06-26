import express from "express";
import healthRoutes from "./v1/healthRoutes.js";
import assessmentRoutes from "./v1/assessmentRoutes.js";
import farnsworthRoutes from "./v1/farnsworthRoutes.js";
import imageRoutes from "./v1/imageRoutes.js";
import processRoutes from "./v1/processRoutes.js";

const router = express.Router();

router.use("/v1", healthRoutes);
router.use("/v1", farnsworthRoutes);
router.use("/v1", assessmentRoutes);
router.use("/v1", imageRoutes);
router.use("/v1", processRoutes);
export default router;
