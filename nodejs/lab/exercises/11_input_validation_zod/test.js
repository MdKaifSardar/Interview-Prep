// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const { z } = require('zod');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { validateBody } = require(target);

test('NODE-11: Zod validation rejects bad input with 422 and passes valid input', async () => {
  const UserSchema = z.object({
    email: z.string().email(),
    age: z.number().min(18)
  });

  const app = express();
  app.use(express.json());

  app.post('/user', validateBody(UserSchema), (req, res) => {
    res.json({ success: true, data: req.validatedBody });
  });

  // Invalid payload
  const badRes = await request(app).post('/user').send({ email: 'not-an-email', age: 15 });
  assert.strictEqual(badRes.status, 422);
  assert.strictEqual(badRes.body.error, 'Validation failed');
  assert.strictEqual(badRes.body.details.length, 2);

  // Valid payload
  const goodRes = await request(app).post('/user').send({ email: 'valid@example.com', age: 24 });
  assert.strictEqual(goodRes.status, 200);
  assert.strictEqual(goodRes.body.data.email, 'valid@example.com');
});
