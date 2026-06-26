import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import imageProcessingController from "../../controllers/imageProcessingController.js";

const router = express.Router();
const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const processDir = path.resolve(baseDirectory, "../../storage/processed");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(processDir, { recursive: true }, (err) => cb(err, processDir));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}-upload${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/png", "image/jpeg"];
  if (!acceptedTypes.includes(file.mimetype)) {
    const err = new Error("Invalid file type.");
    err.code = "INVALID_FILE_TYPE";
    return cb(err, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

router.post("/images/process", upload.single("image"), imageProcessingController.processImage);

export default router;
