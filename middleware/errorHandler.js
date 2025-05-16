const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    const message = err.message || "An unexpected error occurred";
    return res.json({
      message: message,
      status: err.statusCode || 500,
      success: false,
    });
  }
};

module.exports = globalErrorHandler;
