import HTTP_STATUS from "../constants/httpStatus.js";

function errorMiddleware(err, req, res, next) {
  console.error(err);

  let statusCode = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || "An unexpected error occurred.";

  if (err.code === "LIMIT_FILE_SIZE") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "File too large.";
  }

  if (err.code === "INVALID_FILE_TYPE") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Invalid file type.";
  }

  const response = {
    success: false,
    message,
    data: null,
    errors: err.errors || null,
  };

  res.status(statusCode).json(response);
}

export default errorMiddleware;
