// starter.js
const express = require("express");

/**
 * Creates an Express router for products.
 * @param {Array<{ id: number, name: string, category: string, price: number }>} products
 * @returns {express.Router}
 */
function createProductRouter(products) {
  const router = express.Router();

  // TODO:
  // 1. GET / with category and maxPrice query filtering
  router.get("/", (req, res) => {
    let result = [...products];
    let { category, maxPrice } = req.query;
    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (!result) {
      return res.status(404).json({
        message: "no products found",
      });
    }

    return res.status(200).json(result);
  });
  // 2. GET /:id with validation and 404 / 400 handling

  router.get("/:id", (req, res) => {
    let { id } = req.params;
    let result = [...products];
    if (!id) {
      return res.status(400).json({
        message: "id not found",
      });
    }

    if (isNaN(id)) {
      return res.status(400).json({
        message: "id must be a number",
      });
    }

    result = result.find((p) => p.id === Number(id));

    if (!result) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    return res.status(200).json(result);
  });
  return router;
}

module.exports = { createProductRouter };
