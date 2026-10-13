// starter.js
/**
 * Middleware that attaches req.id and sets X-Request-Id header.
 */
function requestIdMiddleware(req, res, next) {
  // TODO
  next();
}

/**
 * Middleware that tracks response duration and sets X-Response-Time-Ms header.
 */
function requestTimerMiddleware(req, res, next) {
  // TODO
  next();
}

module.exports = { requestIdMiddleware, requestTimerMiddleware };
