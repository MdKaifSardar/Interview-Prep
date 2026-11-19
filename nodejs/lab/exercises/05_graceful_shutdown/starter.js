// starter.js
/**
 * Orchestrates graceful shutdown of an HTTP server and dependent resources.
 * @param {{ close: (cb: Function) => void }} server
 * @param {Array<() => Promise<void>>} cleanupTasks
 * @param {{ timeoutMs?: number }} options
 * @returns {() => Promise<boolean>} Shutdown trigger
 */

function createShutdownHandler(server, cleanupTasks = [], options = {}) {
  let shuttingDown = false;
  return async function shutdown() {
    if (shuttingDown) return false;
    shuttingDown = true;

    const appShutdownPromise = new Promise((resolve, reject) => {
      server.close(async (err) => {
        if (err) return reject(err);
        else {
          try {
            for (let task of cleanupTasks) {
              await task();
            }
            resolve(true);
          } catch (err) {
            reject(err);
          }
        }
      });
    });

    const TimerPromise = new Promise((res, rej) => {
      setTimeout(
        () => rej(new Error("Timeout")),
        options.timeoutMs || 5000,
      ).unref();
    });

    return Promise.race([TimerPromise, appShutdownPromise]);
  };
}

module.exports = { createShutdownHandler };
