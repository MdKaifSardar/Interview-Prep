// starter.js
/**
 * Creates custom CORS middleware.
 * @param {{ origin: string|string[], methods?: string[], headers?: string[], credentials?: boolean }} options
 * @returns {import('express').RequestHandler}
 */
function createCorsMiddleware(options = {}) {
  return (req, res, next) => {
    // TODO: Set headers and intercept OPTIONS
    next();
  };
}

module.exports = { createCorsMiddleware };
