const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
const queryFile = process.env.TEST_SOLUTION ? 'solution.sql' : 'starter.sql';
const rawQuery = fs.readFileSync(path.join(__dirname, queryFile), 'utf8');
const cleanQuery = rawQuery.replace(/--.*$/gm, '').trim();

function executeQuery() {
  const db = new DatabaseSync(':memory:');
  db.exec(schemaSql);
  if (!cleanQuery) {
    throw new Error(`Query in ${queryFile} is empty! Please write your SQL solution.`);
  }
  return db.prepare(cleanQuery).all();
}

test('SQL-05: 12-Month Financial Pivot (Q35)', () => {
  const rows = executeQuery();

  assert.strictEqual(rows.length, 2, 'Should return 2 distinct product categories (Books, Electronic)');

  // Verify Books
  const books = rows.find(r => r.category === 'Books');
  assert.ok(books, 'Books category must be present');
  assert.strictEqual(Number(books.Jan), 50, 'Books Jan sales should be 50');
  assert.strictEqual(Number(books.Feb), 0, 'Books Feb sales should be 0');
  assert.strictEqual(Number(books.Mar), 100, 'Books Mar sales should be 100');
  assert.strictEqual(Number(books.Dec), 200, 'Books Dec sales should be 200');
  assert.strictEqual(Number(books.Total_Sales), 350, 'Books Total_Sales should be 350');

  // Verify Electronic
  const elec = rows.find(r => r.category === 'Electronic');
  assert.ok(elec, 'Electronic category must be present');
  assert.strictEqual(Number(elec.Jan), 500, 'Electronic Jan sales should be 500');
  assert.strictEqual(Number(elec.Feb), 300, 'Electronic Feb sales should be 300');
  assert.strictEqual(Number(elec.Mar), 0, 'Electronic Mar sales should be 0');
  assert.strictEqual(Number(elec.Apr), 400, 'Electronic Apr sales should be 400');
  assert.strictEqual(Number(elec.Total_Sales), 1200, 'Electronic Total_Sales should be 1200');
});
