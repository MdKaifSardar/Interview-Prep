# Drill 08: Debugging: Headers Already Sent (Q31, Q60)

## Problem Statement
In Express, calling `res.json()` or `res.send()` ends the HTTP response. If downstream code runs without an early `return`, a second response attempt triggers the fatal error:
`ERR_HTTP_HEADERS_SENT: Cannot set headers after they are sent to the client`

## Task
Inspect and fix `registerUserRoute` in `starter.js`.
Prevent duplicate response execution on validation failure while ensuring valid requests receive a 201 response.

## Hint
Master Answer Reference: [08-output-prediction-and-debugging.md](../../answers/08-output-prediction-and-debugging.md#60-find-and-fix-the-bug-in-an-express-route-that-sends-a-response-twice-cannot-set-headers-after-they-are-sent)
