// starter.js
const request = require('supertest');

/**
 * Supertest integration test helpers.
 */
async function testGetAllItems(app) {
  // TODO: Use request(app).get('/items') and return response
  return null;
}

async function testCreateItem(app, itemData) {
  // TODO: Use request(app).post('/items').send(itemData)
  return null;
}

async function testItemNotFound(app, id) {
  // TODO: Use request(app).get('/items/' + id)
  return null;
}

module.exports = { testGetAllItems, testCreateItem, testItemNotFound };
