// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { requireRoles } = require(target);

test('NODE-14: RBAC middleware allows permitted roles and blocks others', async () => {
  const app = express();

  // Fake auth injector
  app.use((req, res, next) => {
    const role = req.headers['x-fake-role'];
    if (role) req.user = { id: 1, role };
    next();
  });

  app.get('/admin', requireRoles('admin', 'superadmin'), (req, res) => {
    res.json({ access: 'granted' });
  });

  // Unauthenticated
  const resNoAuth = await request(app).get('/admin');
  assert.strictEqual(resNoAuth.status, 401);

  // Insufficient role (user)
  const resUser = await request(app).get('/admin').set('x-fake-role', 'user');
  assert.strictEqual(resUser.status, 403);

  // Permitted role (admin)
  const resAdmin = await request(app).get('/admin').set('x-fake-role', 'admin');
  assert.strictEqual(resAdmin.status, 200);
  assert.strictEqual(resAdmin.body.access, 'granted');
});
