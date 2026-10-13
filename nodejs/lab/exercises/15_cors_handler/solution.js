// solution.js
function createCorsMiddleware(options = {}) {
  const allowedOrigins = Array.isArray(options.origin) ? options.origin : [options.origin || '*'];
  const methods = options.methods || ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
  const headers = options.headers || ['Content-Type', 'Authorization'];
  const credentials = options.credentials || false;

  return (req, res, next) => {
    const requestOrigin = req.headers['origin'];

    if (allowedOrigins.includes('*') || (requestOrigin && allowedOrigins.includes(requestOrigin))) {
      res.setHeader('Access-Control-Allow-Origin', requestOrigin || '*');
    }

    if (credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', headers.join(', '));

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    next();
  };
}

module.exports = { createCorsMiddleware };
