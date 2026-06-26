import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const uploadDirectory = path.resolve(baseDirectory, "../storage/uploads");
const originalDirectory = path.resolve(baseDirectory, "../storage/original");
const processedDirectory = path.resolve(baseDirectory, "../storage/processed");

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

const safeFilename = (filename) => {
  try {
    const decoded = decodeURIComponent(filename);
    if (decoded !== path.basename(decoded)) {
      throw new Error("Invalid filename.");
    }
    if (decoded.includes("..")) {
      throw new Error("Invalid filename.");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid filename.");
  }
};

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const findImagePath = async (filename) => {
  const safeName = safeFilename(filename);
  const processedPath = path.join(processedDirectory, safeName);

  if (await fileExists(processedPath)) {
    return processedPath;
  }

  const originalPath = path.join(originalDirectory, safeName);
  if (await fileExists(originalPath)) {
    return originalPath;
  }

  return null;
};

export default {
  saveUploadedImage,
  findImagePath,
};
