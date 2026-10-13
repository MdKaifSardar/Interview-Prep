// starter.js
const { pipeline } = require('stream');
const { Transform } = require('stream');

/**
 * Transforms chunks to uppercase and pipes to writable safely.
 * @param {import('stream').Readable} readable
 * @param {import('stream').Writable} writable
 * @returns {Promise<void>}
 */
function uppercaseFileStream(readable, writable) {
  // TODO: Use pipeline and a Transform stream
  return Promise.resolve();
}

module.exports = { uppercaseFileStream };
