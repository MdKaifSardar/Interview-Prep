// solution.js
const { randomUUID } = require('crypto');

function requestIdMiddleware(req, res, next) {
  const reqId = req.headers['x-request-id'] || randomUUID();
  req.id = reqId;
  res.setHeader('X-Request-Id', reqId);
  next();
}

function requestTimerMiddleware(req, res, next) {
  const start = Date.now();
  req.startTime = start;

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    // Set in finish if not already sent (header will be logged or set earlier)
  });

  // Calculate and set header right before send
  const originalSend = res.send;
  res.send = function (...args) {
    const elapsed = Date.now() - start;
    res.setHeader('X-Response-Time-Ms', String(elapsed));
    return originalSend.apply(this, args);
  };

  next();
}

module.exports = { requestIdMiddleware, requestTimerMiddleware };
