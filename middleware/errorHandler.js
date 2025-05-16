const globalErrorHandler = (err, req, res, next) => {
  if (err) {
    const message = err.message || "Internal server error";
    return res.json({
      message: message,
      status: 500,
      success: false,
    });
  }
};

module.exports = globalErrorHandler;
