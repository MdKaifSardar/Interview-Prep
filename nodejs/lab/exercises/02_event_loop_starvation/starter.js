// starter.js
/**
 * Sums an array of numbers in chunks using setImmediate to avoid starving the event loop.
 * @param {number[]} numbers
 * @param {number} chunkSize
 * @returns {Promise<number>}
 */

const { setImmediate } = require('node:timers/promises');

async function chunkedSum(numbers, chunkSize) {
    let total = 0;
    for (let index = 0; index < numbers.length; index++) {
      total += numbers[index];
      if (index > 0 && index % chunkSize === 0) {
        await setImmediate(); // Safe! No arguments needed
      }
    }
    return total;
}
module.exports = { chunkedSum };
