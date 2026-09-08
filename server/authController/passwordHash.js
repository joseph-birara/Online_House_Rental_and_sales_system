const bcrypt = require('bcrypt');

const MIN_PASSWORD_LENGTH = 8;

function assertPassword(password) {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error('Password must be at least 8 characters');
  }
}

async function hashPassword(password) {
  assertPassword(password);
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

module.exports = { hashPassword, assertPassword };
