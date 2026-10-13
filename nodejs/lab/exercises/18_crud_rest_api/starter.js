// starter.js
const express = require('express');

/**
 * Creates an in-memory CRUD router for tasks.
 * @returns {express.Router}
 */
function createCrudRouter() {
  const router = express.Router();
  let tasks = [];
  let nextId = 1;

  // TODO: Implement GET /, GET /:id, POST /, PUT /:id, DELETE /:id

  return router;
}

module.exports = { createCrudRouter };
