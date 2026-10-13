// solution.js
const request = require('supertest');

async function testGetAllItems(app) {
  return request(app).get('/items');
}

async function testCreateItem(app, itemData) {
  return request(app).post('/items').send(itemData);
}

async function testItemNotFound(app, id) {
  return request(app).get('/items/' + id);
}

module.exports = { testGetAllItems, testCreateItem, testItemNotFound };
