// starter.js
/**
 * Schedules async tasks in a clean event loop tick and collects their execution order.
 * @returns {Promise<string[]>}
 */
function collectExecutionOrder() {
  return new Promise((resolve) => {
    // We execute inside setImmediate to ensure a fresh event loop tick
    setImmediate(() => {
      const logs = [];

      // TODO:
      // 1. Push 'sync'
      // 2. Schedule 'nextTick' via process.nextTick()
      // 3. Schedule 'promise' via Promise.resolve().then()
      // 4. Schedule 'timeout_0' via setTimeout(..., 10)
      // 5. Schedule 'setImmediate' via setImmediate(...)
      // 6. When all tasks finish, call resolve(logs)
    });
  });
}

module.exports = { collectExecutionOrder };
