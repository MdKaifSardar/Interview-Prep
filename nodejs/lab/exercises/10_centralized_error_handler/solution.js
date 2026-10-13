// solution.js
function centralErrorHandler(err, req, res, next) {
  const statusCode = err.isOperational && err.statusCode ? err.statusCode : 500;
  const message = err.isOperational ? err.message : 'Internal server error';
  const status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

  res.status(statusCode).json({
    status,
    message
  });
}

module.exports = { centralErrorHandler };
