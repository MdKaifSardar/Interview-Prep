// solution.js
const { pipeline } = require('stream/promises');
const { Transform } = require('stream');

async function uppercaseFileStream(readable, writable) {
  const upperTransform = new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });

  await pipeline(readable, upperTransform, writable);
}

module.exports = { uppercaseFileStream };
