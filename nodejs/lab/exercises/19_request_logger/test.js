// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createRequestLogger } = require(target);

test('NODE-19: Request logger captures method, status, url, and duration', async () => {
  const logged = [];
  const app = express();
  app.use(createRequestLogger((data) => logged.push(data)));

  app.get('/api/users', (req, res) => {
    setTimeout(() => res.status(200).json({ ok: true }), 20);
  });

  const res = await request(app).get('/api/users');
  assert.strictEqual(res.status, 200);

  // Give finish event tick to resolve
  await new Promise((r) => setTimeout(r, 10));

  assert.strictEqual(logged.length, 1);
  assert.strictEqual(logged[0].method, 'GET');
  assert.strictEqual(logged[0].url, '/api/users');
  assert.strictEqual(logged[0].status, 200);
  assert.ok(logged[0].durationMs >= 15, 'Duration should record elapsed time');
});
