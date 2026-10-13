// starter.js
const express = require('express');

/**
 * Creates an Express router for products.
 * @param {Array<{ id: number, name: string, category: string, price: number }>} products
 * @returns {express.Router}
 */
function createProductRouter(products) {
  const router = express.Router();

  // TODO:
  // 1. GET / with category and maxPrice query filtering
  // 2. GET /:id with validation and 404 / 400 handling

  return router;
}

module.exports = { createProductRouter };
