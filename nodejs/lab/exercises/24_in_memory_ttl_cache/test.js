// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { TtlCache } = require(target);

test('NODE-24: In-memory TTL cache stores values and evicts expired keys', async () => {
  const cache = new TtlCache();

  cache.set('key1', 'active_value', 100);
  cache.set('key2', 'persistent_value');

  assert.strictEqual(cache.get('key1'), 'active_value');
  assert.strictEqual(cache.has('key1'), true);
  assert.strictEqual(cache.size(), 2);

  // Wait 120ms for key1 to expire
  await new Promise((r) => setTimeout(r, 120));

  assert.strictEqual(cache.get('key1'), null, 'Expired key should return null');
  assert.strictEqual(cache.has('key1'), false);
  assert.strictEqual(cache.get('key2'), 'persistent_value');
  assert.strictEqual(cache.size(), 1);

  cache.del('key2');
  assert.strictEqual(cache.size(), 0);
});
