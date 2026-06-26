import path from "path";
import { promises as fs } from "fs";

const uploadDirectory = path.resolve("./backend/storage/uploads");

const saveUploadedImage = async (file) => {
  await fs.mkdir(uploadDirectory, { recursive: true });

  const result = {
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    path: path.relative(process.cwd(), file.path),
  };

  return result;
};

export default {
  saveUploadedImage,
};
