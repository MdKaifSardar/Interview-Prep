// solution.js
function createRequestLogger(logFn) {
  return (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const durationMs = Date.now() - start;
      logFn({
        method: req.method,
        url: req.originalUrl || req.url,
        status: res.statusCode,
        durationMs
      });
    });

    next();
  };
}

module.exports = { createRequestLogger };
