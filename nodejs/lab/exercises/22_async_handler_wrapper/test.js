// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { asyncHandler } = require(target);

test('NODE-22: asyncHandler forwards asynchronous errors to error middleware', async () => {
  const app = express();

  app.get(
    '/async-fail',
    asyncHandler(async (req, res) => {
      await new Promise((r) => setTimeout(r, 10));
      throw new Error('Async explosion!');
    })
  );

  app.use((err, req, res, next) => {
    res.status(500).json({ caught: true, message: err.message });
  });

  const res = await request(app).get('/async-fail');
  assert.strictEqual(res.status, 500);
  assert.strictEqual(res.body.caught, true);
  assert.strictEqual(res.body.message, 'Async explosion!');
});
