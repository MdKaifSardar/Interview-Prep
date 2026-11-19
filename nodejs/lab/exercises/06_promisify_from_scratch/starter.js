// starter.js
/**
 * Promisifies an error-first callback function.
 * @param {Function} fn
 * @returns {Function}
 */
function myPromisify(fn) {
  // TODO: Return a function that returns a Promise
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
}

module.exports = { myPromisify };
