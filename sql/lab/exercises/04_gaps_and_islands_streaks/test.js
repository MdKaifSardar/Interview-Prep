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

test('SQL-04: Gaps and Islands (Q30)', () => {
  const rows = executeQuery();

  assert.strictEqual(rows.length, 4, 'Should identify exactly 4 distinct streak islands');

  // User 1 streaks
  const u1 = rows.filter(r => Number(r.user_id) === 1);
  assert.strictEqual(u1.length, 2, 'User 1 should have 2 distinct streaks');
  
  // Streak 1: 3 days (Mar 01 - Mar 03)
  assert.strictEqual(u1[0].streak_start_date, '2026-03-01');
  assert.strictEqual(u1[0].streak_end_date, '2026-03-03');
  assert.strictEqual(Number(u1[0].consecutive_days), 3);

  // Streak 2: 2 days (Mar 05 - Mar 06)
  assert.strictEqual(u1[1].streak_start_date, '2026-03-05');
  assert.strictEqual(u1[1].streak_end_date, '2026-03-06');
  assert.strictEqual(Number(u1[1].consecutive_days), 2);

  // User 2 streaks
  const u2 = rows.filter(r => Number(r.user_id) === 2);
  assert.strictEqual(u2.length, 2, 'User 2 should have 2 distinct streaks');

  // User 2 Streak 1: 1 day (Mar 01)
  assert.strictEqual(u2[0].streak_start_date, '2026-03-01');
  assert.strictEqual(u2[0].streak_end_date, '2026-03-01');
  assert.strictEqual(Number(u2[0].consecutive_days), 1);

  // User 2 Streak 2: 4 days (Mar 04 - Mar 07)
  assert.strictEqual(u2[1].streak_start_date, '2026-03-04');
  assert.strictEqual(u2[1].streak_end_date, '2026-03-07');
  assert.strictEqual(Number(u2[1].consecutive_days), 4);
});
