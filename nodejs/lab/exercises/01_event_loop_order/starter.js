// starter.js
/**
 * Schedules async tasks in a clean event loop tick and collects their execution order.
 * @returns {Promise<string[]>}
 */
function collectExecutionOrder() {
  return new Promise((resolve) => {
    setImmediate(() => {
      const logs = [];

      logs.push('sync');

      process.nextTick(() => {
        logs.push('nextTick');
      });

      Promise.resolve().then(() => {
        logs.push('promise');
      });

      setTimeout(() => {
        logs.push('timeout_0');
        checkDone();
      }, 15);

      setImmediate(() => {
        logs.push('setImmediate');
        checkDone();
      });

      function checkDone() {
        if (logs.length === 5) {
          resolve(logs);
        }
      }
    });
  });
}

module.exports = { collectExecutionOrder };
