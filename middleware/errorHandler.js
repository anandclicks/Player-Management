const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    const message = err.message || "An unexpected error occurred";
    return res.status(500).json({
      message: message,
      success: false,
    });
  }
};

module.exports = globalErrorHandler;
