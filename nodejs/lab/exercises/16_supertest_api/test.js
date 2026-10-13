// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { testGetAllItems, testCreateItem, testItemNotFound } = require(target);

test('NODE-16: Supertest test helpers correctly probe endpoints', async () => {
  const items = [{ id: 1, name: 'Item 1' }];
  const app = express();
  app.use(express.json());

  app.get('/items', (req, res) => res.json(items));
  app.post('/items', (req, res) => {
    const newItem = { id: items.length + 1, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
  });
  app.get('/items/:id', (req, res) => {
    const item = items.find((i) => i.id === Number(req.params.id));
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  const resList = await testGetAllItems(app);
  assert.strictEqual(resList.status, 200);

  const resCreate = await testCreateItem(app, { name: 'Item 2' });
  assert.strictEqual(resCreate.status, 201);
  assert.strictEqual(resCreate.body.id, 2);

  const resMissing = await testItemNotFound(app, 999);
  assert.strictEqual(resMissing.status, 404);
});
