// starter.js
/**
 * Buggy middleware: Fix hanging request branches!
 */
function verifyApiKey(expectedKey) {
  return (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    if (apiKey === expectedKey) {
      // Valid key
      next();
    }
    // BUG: Missing handling for invalid key (causes request to hang!)
  };
}

module.exports = { verifyApiKey };
