import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

const originalDirectory = path.resolve("./backend/storage/original");
const processedDirectory = path.resolve("./backend/storage/processed");

const ensureDirectories = async () => {
  await fs.mkdir(originalDirectory, { recursive: true });
  await fs.mkdir(processedDirectory, { recursive: true });
};

const processProtanopia = async (file) => {
  await ensureDirectories();

  const originalFilename = `${Date.now()}-original${path.extname(file.originalname)}`;
  const processedFilename = `${Date.now()}-protanopia${path.extname(file.originalname)}`;

  const originalPath = path.join(originalDirectory, originalFilename);
  const processedPath = path.join(processedDirectory, processedFilename);

  await fs.copyFile(file.path, originalPath);

  const matrix = [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ];

  await sharp(file.path)
    .recomb(matrix)
    .toFile(processedPath);

  return {
    originalImage: path.relative(process.cwd(), originalPath),
    processedImage: path.relative(process.cwd(), processedPath),
    type: "protanopia",
  };
};

export default {
  processProtanopia,
};
