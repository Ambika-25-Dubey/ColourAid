import express from "express";
import healthRoutes from "./v1/healthRoutes.js";
import assessmentRoutes from "./v1/assessmentRoutes.js";

const router = express.Router();

router.use("/v1", healthRoutes);
router.use("/v1", assessmentRoutes);

export default router;
