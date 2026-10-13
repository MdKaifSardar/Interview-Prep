// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { Readable } = require('stream');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { parseCsvStream } = require(target);

test('NODE-23: CSV stream parser splits chunks across boundaries correctly', async () => {
  // Simulate fragmented stream chunks splitting lines mid-word
  const chunks = [
    'name,age,city\nAl',
    'ice,25,NYC\nBob,3',
    '0,London\nCharlie,',
    '35,Paris'
  ];

  const readable = Readable.from(chunks);
  const results = await parseCsvStream(readable);

  assert.strictEqual(results.length, 3);
  assert.deepStrictEqual(results[0], { name: 'Alice', age: '25', city: 'NYC' });
  assert.deepStrictEqual(results[1], { name: 'Bob', age: '30', city: 'London' });
  assert.deepStrictEqual(results[2], { name: 'Charlie', age: '35', city: 'Paris' });
});
