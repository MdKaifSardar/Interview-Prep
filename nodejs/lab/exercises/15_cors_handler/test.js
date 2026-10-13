// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createCorsMiddleware } = require(target);

test('NODE-15: Custom CORS responds to preflight OPTIONS and sets headers', async () => {
  const app = express();
  app.use(createCorsMiddleware({ origin: ['https://myapp.com'], credentials: true }));
  app.get('/api/data', (req, res) => res.json({ ok: true }));

  // Preflight
  const resOptions = await request(app).options('/api/data').set('Origin', 'https://myapp.com');
  assert.strictEqual(resOptions.status, 204);
  assert.strictEqual(resOptions.headers['access-control-allow-origin'], 'https://myapp.com');
  assert.strictEqual(resOptions.headers['access-control-allow-credentials'], 'true');

  // Actual GET
  const resGet = await request(app).get('/api/data').set('Origin', 'https://myapp.com');
  assert.strictEqual(resGet.status, 200);
  assert.strictEqual(resGet.headers['access-control-allow-origin'], 'https://myapp.com');
});
