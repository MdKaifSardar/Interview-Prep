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

test('SQL-02: Recursive CTE Org-Tree Traversal (Q20)', () => {
  const rows = executeQuery();

  assert.strictEqual(rows.length, 6, 'Should return all 6 employees in hierarchy');

  // Validate CEO at level 1
  assert.strictEqual(rows[0].id, 1, 'Top employee should be Alice (CEO)');
  assert.strictEqual(rows[0].manager_id, null, 'CEO should have NULL manager');
  assert.strictEqual(Number(rows[0].org_level), 1, 'CEO org_level should be 1');

  // Validate Level 2
  const level2 = rows.filter(r => Number(r.org_level) === 2);
  assert.strictEqual(level2.length, 2, 'There should be 2 employees at Level 2 (Bob, Charlie)');
  assert.deepStrictEqual(level2.map(r => r.name).sort(), ['Bob', 'Charlie']);

  // Validate Level 3
  const level3 = rows.filter(r => Number(r.org_level) === 3);
  assert.strictEqual(level3.length, 2, 'There should be 2 employees at Level 3 (David, Eve)');
  assert.deepStrictEqual(level3.map(r => r.name).sort(), ['David', 'Eve']);

  // Validate Level 4 (Frank reports to David)
  const frank = rows.find(r => r.name === 'Frank');
  assert.ok(frank, 'Frank must be present');
  assert.strictEqual(Number(frank.org_level), 4, 'Frank should be at level 4');
  assert.strictEqual(frank.manager_id, 4, 'Frank direct manager should be David (id: 4)');
});
