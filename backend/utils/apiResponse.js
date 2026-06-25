function apiResponse(res, { success, message, data = null, errors = null, status = 200 }) {
  return res.status(status).json({
    success,
    message,
    data,
    errors,
  });
}

export default apiResponse;
