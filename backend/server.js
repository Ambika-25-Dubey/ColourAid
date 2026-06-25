import express from "express";
import cors from "cors";
import helmet from "helmet";
import requestLogger from "./middleware/requestLogger.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import env from "./config/env.js";
import initializeDatabase from "./database/initDatabase.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api", routes);

app.use((req, res, next) => {
  const error = new Error("Resource not found.");
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

try {
  await initializeDatabase();
  app.listen(env.PORT, () => {
    console.log(`ColourAid backend running on port ${env.PORT}`);
  });
} catch (error) {
  console.error("Failed to initialize the database:", error);
  process.exit(1);
}
