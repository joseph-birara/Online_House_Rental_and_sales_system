const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';

function generateToken(userId) {
  return jwt.sign({ userId }, secret);
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
