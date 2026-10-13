// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { authenticateJwt } = require(target);

test('NODE-13: JWT guard blocks unauthenticated and validates tokens', async () => {
  const SECRET = 'jwt-lab-secret';
  const app = express();

  app.get('/protected', authenticateJwt(SECRET), (req, res) => {
    res.json({ message: 'Welcome ' + req.user.username });
  });

  // Missing header
  const resMissing = await request(app).get('/protected');
  assert.strictEqual(resMissing.status, 401);

  // Invalid token
  const resBadToken = await request(app).get('/protected').set('Authorization', 'Bearer invalid.token.value');
  assert.strictEqual(resBadToken.status, 403);

  // Valid token
  const validToken = jwt.sign({ username: 'kaif', role: 'admin' }, SECRET, { expiresIn: '1h' });
  const resGood = await request(app).get('/protected').set('Authorization', 'Bearer ' + validToken);
  assert.strictEqual(resGood.status, 200);
  assert.strictEqual(resGood.body.message, 'Welcome kaif');
});
