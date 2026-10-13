// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { collectExecutionOrder } = require(target);

test('NODE-01: Microtasks execute before macrotasks in correct order', async () => {
  const order = await collectExecutionOrder();
  assert.strictEqual(order[0], 'sync', 'Synchronous code should run first');
  assert.strictEqual(order[1], 'nextTick', 'process.nextTick should run before Promise microtasks');
  assert.strictEqual(order[2], 'promise', 'Promise microtasks should run after nextTick');
  assert.ok(order.includes('timeout_0'), 'setTimeout(0) should execute');
  assert.ok(order.includes('setImmediate'), 'setImmediate should execute');
  assert.strictEqual(order.length, 5, 'All 5 tasks should execute');
});
