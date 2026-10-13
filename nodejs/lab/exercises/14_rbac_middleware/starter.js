// starter.js
/**
 * Express middleware restricting routes by role.
 * @param  {...string} allowedRoles
 * @returns {import('express').RequestHandler}
 */
function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    // TODO: Validate req.user.role against allowedRoles
    next();
  };
}

module.exports = { requireRoles };
