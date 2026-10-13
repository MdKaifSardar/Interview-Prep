// solution.js
function chunkedSum(numbers, chunkSize) {
  return new Promise((resolve) => {
    let total = 0;
    let index = 0;

    function processChunk() {
      const end = Math.min(index + chunkSize, numbers.length);
      for (; index < end; index++) {
        total += numbers[index];
      }

      if (index < numbers.length) {
        setImmediate(processChunk);
      } else {
        resolve(total);
      }
    }

    processChunk();
  });
}

module.exports = { chunkedSum };
