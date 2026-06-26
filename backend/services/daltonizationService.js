import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const originalDirectory = path.resolve(baseDirectory, "../storage/original");
const processedDirectory = path.resolve(baseDirectory, "../storage/processed");

// Pre-calculated combined matrices in linear RGB space
const MATRICES = {
  protan: {
    simulate: [
      [0.11238, 0.8876, 0],
      [0.11238, 0.8876, 0],
      [0.00401, -0.004, 1]
    ],
    correct: [
      [1, 0, 0],
      [0.50895, 0.49106, 0],
      [0.61733, -0.61732, 1]
    ]
  },
  deutan: {
    simulate: [
      [0.29275, 0.70725, 0],
      [0.29275, 0.70725, 0],
      [-0.02233, 0.02234, 1]
    ],
    correct: [
      [1.50233, -0.50232, 0],
      [0, 1, 0],
      [-0.18259, 0.18258, 1]
    ]
  },
  tritan: {
    simulate: [
      [0.49325, 0.50675, 0],
      [0.49326, 0.50674, 0],
      [-3.01086, 3.01091, 1]
    ],
    correct: [
      [3.61435, -2.61438, 0],
      [1.61435, -0.61437, 0],
      [0, 0, 1]
    ]
  }
};

const normalizeCvdType = (type) => {
  if (!type) return "protan";
  const t = type.toLowerCase();
  if (t === "deutan" || t === "deuteranopia" || t.includes("red-green")) {
    return "deutan";
  }
  if (t === "tritan" || t === "tritanopia" || t.includes("blue-yellow") || t === "possible_blue_yellow") {
    return "tritan";
  }
  return "protan"; // maps protan, protanopia, possible_red_green, etc.
};

const ensureDirectories = async () => {
  await fs.mkdir(originalDirectory, { recursive: true });
  await fs.mkdir(processedDirectory, { recursive: true });
};

const processImage = async (file, type = "protan", action = "correct") => {
  await ensureDirectories();

  const cvdType = normalizeCvdType(type);
  const act = action === "simulate" ? "simulate" : "correct";

  const matrix = MATRICES[cvdType][act];
  
  const originalFilename = `${Date.now()}-original${path.extname(file.originalname)}`;
  const processedFilename = `${Date.now()}-${cvdType}-${act}${path.extname(file.originalname)}`;

  const originalPath = path.join(originalDirectory, originalFilename);
  const processedPath = path.join(processedDirectory, processedFilename);

  // Copy original uploaded file
  await fs.copyFile(file.path, originalPath);

  // Apply matrix recombination using Sharp
  await sharp(file.path)
    .recomb(matrix)
    .toFile(processedPath);

  return {
    originalFilename,
    processedFilename,
    originalImage: `/api/v1/images/${originalFilename}`,
    processedImage: `/api/v1/images/${processedFilename}`,
    type: cvdType,
    action: act
  };
};

// Deprecated alias for backwards compatibility
const processProtanopia = async (file) => {
  return processImage(file, "protan", "correct");
};

export default {
  processImage,
  processProtanopia
};

