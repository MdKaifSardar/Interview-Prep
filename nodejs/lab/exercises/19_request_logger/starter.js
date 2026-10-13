// starter.js
/**
 * Creates a request logger middleware.
 * @param {(logData: { method: string, url: string, status: number, durationMs: number }) => void} logFn
 * @returns {import('express').RequestHandler}
 */
function createRequestLogger(logFn) {
  return (req, res, next) => {
    // TODO: Record start time and listen for 'finish'
    next();
  };
}

module.exports = { createRequestLogger };
