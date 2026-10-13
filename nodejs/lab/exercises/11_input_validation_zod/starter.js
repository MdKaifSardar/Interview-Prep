// starter.js
/**
 * Express middleware factory validating req.body against a Zod schema.
 * @param {import('zod').ZodSchema} schema
 * @returns {import('express').RequestHandler}
 */
function validateBody(schema) {
  return (req, res, next) => {
    // TODO: Use schema.safeParse(req.body)
    next();
  };
}

module.exports = { validateBody };
