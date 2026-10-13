// starter.js
const bcrypt = require('bcryptjs');

/**
 * Hashes a plaintext password securely.
 * @param {string} plainText
 * @param {number} [saltRounds=10]
 * @returns {Promise<string>}
 */
async function hashPassword(plainText, saltRounds = 10) {
  // TODO
  return '';
}

/**
 * Verifies a plaintext password against a stored hash.
 * @param {string} plainText
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function verifyPassword(plainText, hash) {
  // TODO
  return false;
}

module.exports = { hashPassword, verifyPassword };
