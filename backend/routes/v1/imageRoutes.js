import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import imageController from "../../controllers/imageController.js";

const router = express.Router();
const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(baseDirectory, "../../storage/uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      cb(err, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const filename = `${timestamp}-${file.fieldname}${extension}`;
    cb(null, filename);
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

router.post("/images/upload", upload.single("image"), imageController.uploadImage);
router.get("/images/:filename", imageController.serveImage);

export default router;
