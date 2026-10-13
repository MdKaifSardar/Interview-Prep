// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createCrudRouter } = require(target);

test('NODE-18: Complete CRUD operations return standard REST status codes', async () => {
  const app = express();
  app.use(express.json());
  app.use('/tasks', createCrudRouter());

  // 1. Initial list is empty
  const res1 = await request(app).get('/tasks');
  assert.strictEqual(res1.status, 200);
  assert.deepStrictEqual(res1.body, []);

  // 2. Create task
  const res2 = await request(app).post('/tasks').send({ title: 'Study Node' });
  assert.strictEqual(res2.status, 201);
  assert.strictEqual(res2.body.id, 1);
  assert.strictEqual(res2.body.title, 'Study Node');

  // 3. Update task
  const res3 = await request(app).put('/tasks/1').send({ completed: true });
  assert.strictEqual(res3.status, 200);
  assert.strictEqual(res3.body.completed, true);

  // 4. Delete task
  const res4 = await request(app).delete('/tasks/1');
  assert.strictEqual(res4.status, 204);

  // 5. Verify deleted
  const res5 = await request(app).get('/tasks/1');
  assert.strictEqual(res5.status, 404);
});
