// starter.js
/**
 * Streams and parses CSV data into row objects without buffering entire file.
 * @param {import('stream').Readable} readable
 * @returns {Promise<Array<Record<string, string>>>}
 */
async function parseCsvStream(readable) {
  // TODO: Buffer remainder across chunk boundaries, parse headers and rows
  return [];
}

module.exports = { parseCsvStream };
