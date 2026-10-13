// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const express = require('express');
const request = require('supertest');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createProductRouter } = require(target);

test('NODE-07: Express products router filters and validates params', async () => {
  const items = [
    { id: 1, name: 'Laptop', category: 'tech', price: 1200 },
    { id: 2, name: 'Mouse', category: 'tech', price: 40 },
    { id: 3, name: 'Desk', category: 'office', price: 300 }
  ];

  const app = express();
  app.use(express.json());
  app.use('/products', createProductRouter(items));

  // Test query filtering
  const resFiltered = await request(app).get('/products?category=tech&maxPrice=100');
  assert.strictEqual(resFiltered.status, 200);
  assert.strictEqual(resFiltered.body.length, 1);
  assert.strictEqual(resFiltered.body[0].name, 'Mouse');

  // Test single item lookup
  const resItem = await request(app).get('/products/1');
  assert.strictEqual(resItem.status, 200);
  assert.strictEqual(resItem.body.name, 'Laptop');

  // Test 404
  const resMissing = await request(app).get('/products/999');
  assert.strictEqual(resMissing.status, 404);

  // Test 400
  const resInvalid = await request(app).get('/products/abc');
  assert.strictEqual(resInvalid.status, 400);
});
