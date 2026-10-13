# Drill 15: Zero-Dependency CORS Middleware (Q49)

## Problem Statement
Cross-Origin Resource Sharing (CORS) enforces browser security. An API must handle preflight `OPTIONS` requests and specify allowed origins, methods, and headers.

## Task
Implement `createCorsMiddleware(options)` in `starter.js`.
- `options.origin`: Whitelist of allowed origins (or string).
- Set `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, and `Access-Control-Allow-Credentials`.
- If `req.method === 'OPTIONS'`, immediately respond with status `204` and end the request.

## Hint
Master Answer Reference: [06-rest-apis-and-security.md](../../answers/06-rest-apis-and-security.md#49-how-do-you-configure-cors-in-an-express-api-allowed-origins-credentials-preflight-requests-and-why-cant-origin--be-used-with-credentials)
