// starter.js
const jwt = require('jsonwebtoken');

/**
 * Creates JWT authentication middleware.
 * @param {string} secret
 * @returns {import('express').RequestHandler}
 */
function authenticateJwt(secret) {
  return (req, res, next) => {
    // TODO: Extract token, verify, attach req.user
    next();
  };
}

module.exports = { authenticateJwt };
