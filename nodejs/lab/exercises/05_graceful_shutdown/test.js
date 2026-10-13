// test.js
const { test } = require('node:test');
const assert = require('node:assert');
const target = process.env.TEST_SOLUTION ? './solution.js' : './starter.js';
const { createShutdownHandler } = require(target);

test('NODE-05: Graceful shutdown stops server and cleans up resources', async () => {
  let serverClosed = false;
  let dbDisconnected = false;

  const fakeServer = {
    close(cb) {
      serverClosed = true;
      cb();
    }
  };

  const cleanupTasks = [
    async () => {
      dbDisconnected = true;
    }
  ];

  const shutdown = createShutdownHandler(fakeServer, cleanupTasks, { timeoutMs: 1000 });
  const result = await shutdown();

  assert.strictEqual(result, true);
  assert.strictEqual(serverClosed, true);
  assert.strictEqual(dbDisconnected, true);
});
