// solution.js
function createShutdownHandler(server, cleanupTasks = [], options = {}) {
  const timeoutMs = options.timeoutMs || 5000;
  let isShuttingDown = false;

  return async function shutdown() {
    if (isShuttingDown) return true;
    isShuttingDown = true;

    const shutdownPromise = new Promise((resolve, reject) => {
      server.close(async (err) => {
        if (err) return reject(err);
        try {
          for (const task of cleanupTasks) {
            await task();
          }
          resolve(true);
        } catch (taskErr) {
          reject(taskErr);
        }
      });
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Shutdown timeout exceeded')), timeoutMs).unref();
    });

    return Promise.race([shutdownPromise, timeoutPromise]);
  };
}

module.exports = { createShutdownHandler };
