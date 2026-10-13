// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { chunkedSum } = require(target);

test('NODE-02: Chunked sum computes correctly and yields to event loop', async () => {
  const numbers = Array.from({ length: 1000 }, (_, i) => i + 1);
  const expectedSum = (1000 * 1001) / 2;

  let interleavedRan = false;
  setImmediate(() => {
    interleavedRan = true;
  });

  const sum = await chunkedSum(numbers, 50);

  assert.strictEqual(sum, expectedSum, 'Sum should match formula');
  assert.strictEqual(interleavedRan, true, 'Interleaved task must execute during chunking');
});
