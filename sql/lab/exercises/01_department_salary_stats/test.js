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

test('SQL-01: Department Multi-Aggregates (Q10)', () => {
  const rows = executeQuery();

  assert.strictEqual(rows.length, 4, 'Should return exactly 4 departments (including HR with 0 employees)');

  // Validate Engineering (3 employees)
  const eng = rows.find(r => r.department_name === 'Engineering');
  assert.ok(eng, 'Engineering department must be present');
  assert.strictEqual(Number(eng.employee_count), 3, 'Engineering headcount should be 3');
  assert.strictEqual(Number(eng.avg_salary), 85000, 'Engineering avg_salary should be 85000');
  assert.strictEqual(Number(eng.min_salary), 70000, 'Engineering min_salary should be 70000');
  assert.strictEqual(Number(eng.max_salary), 100000, 'Engineering max_salary should be 100000');

  // Validate Marketing (2 employees)
  const mkt = rows.find(r => r.department_name === 'Marketing');
  assert.ok(mkt, 'Marketing department must be present');
  assert.strictEqual(Number(mkt.employee_count), 2, 'Marketing headcount should be 2');
  assert.strictEqual(Number(mkt.avg_salary), 57500, 'Marketing avg_salary should be 57500');

  // Validate Human Resources (0 employees - Outer Join edge case)
  const hr = rows.find(r => r.department_name === 'Human Resources');
  assert.ok(hr, 'Human Resources must be included (Outer Join test)');
  assert.strictEqual(Number(hr.employee_count), 0, 'HR headcount should be 0');
  assert.strictEqual(Number(hr.avg_salary), 0, 'HR avg_salary should be 0');
});
