// solution.js
const bcrypt = require('bcryptjs');

async function hashPassword(plainText, saltRounds = 10) {
  return bcrypt.hash(plainText, saltRounds);
}

async function verifyPassword(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

module.exports = { hashPassword, verifyPassword };
