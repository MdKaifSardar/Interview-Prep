// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { MyEventEmitter } = require(target);

test('NODE-03: Custom EventEmitter operations', () => {
  const emitter = new MyEventEmitter();
  const calls = [];

  const fn1 = (msg) => calls.push('fn1:' + msg);
  const fn2 = (msg) => calls.push('fn2:' + msg);

  emitter.on('greet', fn1);
  emitter.on('greet', fn2);

  assert.strictEqual(emitter.listenerCount('greet'), 2);

  emitter.emit('greet', 'hello');
  assert.deepStrictEqual(calls, ['fn1:hello', 'fn2:hello']);

  // Test off
  emitter.off('greet', fn1);
  assert.strictEqual(emitter.listenerCount('greet'), 1);

  emitter.emit('greet', 'again');
  assert.deepStrictEqual(calls, ['fn1:hello', 'fn2:hello', 'fn2:again']);

  // Test once
  let onceCount = 0;
  emitter.once('ping', () => onceCount++);
  emitter.emit('ping');
  emitter.emit('ping');
  assert.strictEqual(onceCount, 1);
  assert.strictEqual(emitter.listenerCount('ping'), 0);
});
