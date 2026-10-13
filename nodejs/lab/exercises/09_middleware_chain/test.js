// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { requestIdMiddleware, requestTimerMiddleware } = require(target);

test('NODE-09: Middleware chain adds X-Request-Id and timer headers', async () => {
  const app = express();
  app.use(requestIdMiddleware);
  app.use(requestTimerMiddleware);

  app.get('/test', (req, res) => {
    assert.ok(req.id, 'req.id should be set');
    assert.ok(req.startTime, 'req.startTime should be set');
    res.json({ ok: true });
  });

  const res = await request(app).get('/test');
  assert.strictEqual(res.status, 200);
  assert.ok(res.headers['x-request-id'], 'Header X-Request-Id must be present');
  assert.ok(res.headers['x-response-time-ms'] !== undefined, 'Header X-Response-Time-Ms must be present');
});
