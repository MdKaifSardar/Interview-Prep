// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { AppError } = require(target);

test('NODE-20: AppError models operational errors with status codes', () => {
  const err = new AppError('Payment failed', 402);
  assert.strictEqual(err.message, 'Payment failed');
  assert.strictEqual(err.statusCode, 402);
  assert.strictEqual(err.status, 'fail');
  assert.strictEqual(err.isOperational, true);
  assert.ok(err.stack, 'Stack trace should be preserved');

  const notFound = AppError.notFound('Resource missing');
  assert.strictEqual(notFound.statusCode, 404);

  const badReq = AppError.badRequest('Invalid payload');
  assert.strictEqual(badReq.statusCode, 400);
});
