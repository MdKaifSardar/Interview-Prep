// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { hashPassword, verifyPassword } = require(target);

test('NODE-12: Hashes password securely and verifies matches', async () => {
  const secret = 'SuperSecureP@ssword123';
  const hash = await hashPassword(secret, 8);

  assert.notStrictEqual(hash, secret, 'Hash must not equal plaintext');
  assert.ok(hash.startsWith('$2'), 'Hash should have bcrypt prefix');

  const isMatch = await verifyPassword(secret, hash);
  assert.strictEqual(isMatch, true, 'Correct password must verify');

  const isMismatch = await verifyPassword('wrong-password', hash);
  assert.strictEqual(isMismatch, false, 'Wrong password must be rejected');
});
