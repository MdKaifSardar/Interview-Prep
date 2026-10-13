// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const { Readable, Writable } = require('stream');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { uppercaseFileStream } = require(target);

test('NODE-04: Stream pipeline transforms content cleanly', async () => {
  const source = ['hello ', 'world!'];
  const readable = Readable.from(source);

  let output = '';
  const writable = new Writable({
    write(chunk, encoding, cb) {
      output += chunk.toString();
      cb();
    }
  });

  await uppercaseFileStream(readable, writable);
  assert.strictEqual(output, 'HELLO WORLD!');
});
