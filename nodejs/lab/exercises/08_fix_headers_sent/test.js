// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { handleRegister } = require(target);

test('NODE-08: Does not throw headers sent error on validation failures', async () => {
  const app = express();
  app.use(express.json());
  app.post('/register', handleRegister);

  // Missing username
  const res1 = await request(app).post('/register').send({ email: 'test@example.com' });
  assert.strictEqual(res1.status, 400);
  assert.strictEqual(res1.body.error, 'Username required');

  // Missing email
  const res2 = await request(app).post('/register').send({ username: 'kaif' });
  assert.strictEqual(res2.status, 400);
  assert.strictEqual(res2.body.error, 'Email required');

  // Valid registration
  const res3 = await request(app).post('/register').send({ username: 'kaif', email: 'kaif@test.com' });
  assert.strictEqual(res3.status, 201);
  assert.strictEqual(res3.body.success, true);
});
