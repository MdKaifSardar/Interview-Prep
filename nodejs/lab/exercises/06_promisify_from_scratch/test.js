// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { myPromisify } = require(target);

test('NODE-06: Promisify converts callback to resolving and rejecting promise', async () => {
  function fakeAsyncSuccess(a, b, cb) {
    setTimeout(() => cb(null, a + b), 10);
  }

  function fakeAsyncFail(msg, cb) {
    setTimeout(() => cb(new Error(msg)), 10);
  }

  const addPromise = myPromisify(fakeAsyncSuccess);
  const failPromise = myPromisify(fakeAsyncFail);

  const sum = await addPromise(10, 20);
  assert.strictEqual(sum, 30);

  await assert.rejects(async () => {
    await failPromise('boom');
  }, /boom/);
});
