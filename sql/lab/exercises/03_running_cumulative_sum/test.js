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

test('SQL-03: Partitioned Running Cumulative Sum (Q26)', () => {
  const rows = executeQuery();

  assert.strictEqual(rows.length, 6, 'Should return all 6 transactions');

  // Verify Books partition running sums: 30 -> 75 -> 100
  const books = rows.filter(r => r.category === 'Books');
  assert.strictEqual(books.length, 3);
  assert.strictEqual(Number(books[0].cumulative_amount), 30, 'First book txn cumulative should be 30');
  assert.strictEqual(Number(books[1].cumulative_amount), 75, 'Second book txn cumulative should be 75 (30+45)');
  assert.strictEqual(Number(books[2].cumulative_amount), 100, 'Third book txn cumulative should be 100 (75+25)');

  // Verify Electronic partition running sums: 500 -> 700 -> 1000
  const elec = rows.filter(r => r.category === 'Electronic');
  assert.strictEqual(elec.length, 3);
  assert.strictEqual(Number(elec[0].cumulative_amount), 500);
  assert.strictEqual(Number(elec[1].cumulative_amount), 700);
  assert.strictEqual(Number(elec[2].cumulative_amount), 1000);
});
