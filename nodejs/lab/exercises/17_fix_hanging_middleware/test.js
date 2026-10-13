// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { verifyApiKey } = require(target);

test('NODE-17: API key middleware handles all valid, invalid, and missing paths', async () => {
  const app = express();
  app.use(verifyApiKey('secret-123'));
  app.get('/data', (req, res) => res.json({ ok: true }));

  // Missing
  const resMissing = await request(app).get('/data');
  assert.strictEqual(resMissing.status, 401);

  // Invalid key (Must not hang!)
  const resBad = await request(app).get('/data').set('x-api-key', 'wrong');
  assert.strictEqual(resBad.status, 403);

  // Valid key
  const resGood = await request(app).get('/data').set('x-api-key', 'secret-123');
  assert.strictEqual(resGood.status, 200);
});
