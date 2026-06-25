import HTTP_STATUS from "../constants/httpStatus.js";

function errorMiddleware(err, req, res, next) {
  console.error(err);

  const statusCode = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const response = {
    success: false,
    message: err.message || "An unexpected error occurred.",
    data: null,
    errors: err.errors || null,
  };

  res.status(statusCode).json(response);
}

export default errorMiddleware;
