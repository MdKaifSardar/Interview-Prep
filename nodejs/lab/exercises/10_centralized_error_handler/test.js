// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { centralErrorHandler } = require(target);

test('NODE-10: Centralized error middleware formats operational vs unexpected errors', async () => {
  const app = express();

  app.get('/operational', (req, res, next) => {
    const err = new Error('Item already exists');
    err.statusCode = 409;
    err.isOperational = true;
    next(err);
  });

  app.get('/crash', (req, res, next) => {
    next(new Error('Database connection failed!'));
  });

  app.use(centralErrorHandler);

  // Operational error
  const resOp = await request(app).get('/operational');
  assert.strictEqual(resOp.status, 409);
  assert.strictEqual(resOp.body.status, 'fail');
  assert.strictEqual(resOp.body.message, 'Item already exists');

  // Unexpected internal error
  const resCrash = await request(app).get('/crash');
  assert.strictEqual(resCrash.status, 500);
  assert.strictEqual(resCrash.body.status, 'error');
  assert.strictEqual(resCrash.body.message, 'Internal server error');
});
