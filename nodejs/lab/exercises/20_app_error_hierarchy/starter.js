// starter.js
class AppError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    // TODO
  }

  static badRequest(message = 'Bad Request') {
    // TODO: 400
  }

  static unauthorized(message = 'Unauthorized') {
    // TODO: 401
  }

  static notFound(message = 'Not Found') {
    // TODO: 404
  }
}

module.exports = { AppError };
