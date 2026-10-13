// solution.js
const express = require('express');

function createProductRouter(products) {
  const router = express.Router();

  router.get('/', (req, res) => {
    let filtered = [...products];
    const { category, maxPrice } = req.query;

    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        filtered = filtered.filter((p) => p.price <= max);
      }
    }

    res.json(filtered);
  });

  router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const product = products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  });

  return router;
}

module.exports = { createProductRouter };
