// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createRateLimiter } = require(target);

test('NODE-21: Rate limiter enforces limit and blocks excessive requests with 429', async () => {
  const app = express();
  app.use(createRateLimiter({ maxRequests: 3, windowMs: 200 }));
  app.get('/api', (req, res) => res.json({ ok: true }));

  // Requests 1, 2, 3 should succeed
  for (let i = 0; i < 3; i++) {
    const res = await request(app).get('/api');
    assert.strictEqual(res.status, 200);
  }

  // Request 4 should be rejected with 429
  const resBlocked = await request(app).get('/api');
  assert.strictEqual(resBlocked.status, 429);
  assert.strictEqual(resBlocked.body.error, 'Too many requests, please try again later.');

  // Wait for window to reset (220ms)
  await new Promise((r) => setTimeout(r, 220));

  // Request 5 should succeed after reset
  const resAfterReset = await request(app).get('/api');
  assert.strictEqual(resAfterReset.status, 200);
});
