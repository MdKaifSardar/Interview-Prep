// starter.js
/**
 * Wraps an async Express handler to automatically forward errors to next().
 * @param {(req: any, res: any, next: any) => Promise<any>} fn
 * @returns {import('express').RequestHandler}
 */
function asyncHandler(fn) {
  // TODO
  return (req, res, next) => {};
}

module.exports = { asyncHandler };
