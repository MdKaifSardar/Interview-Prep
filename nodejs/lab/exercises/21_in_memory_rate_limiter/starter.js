// starter.js
/**
 * Creates an in-memory rate limiting middleware.
 * @param {{ maxRequests: number, windowMs: number }} options
 * @returns {import('express').RequestHandler}
 */
function createRateLimiter({ maxRequests, windowMs }) {
  // TODO: Keep tracks of IP timestamps or hit counters
  return (req, res, next) => {
    next();
  };
}

module.exports = { createRateLimiter };
