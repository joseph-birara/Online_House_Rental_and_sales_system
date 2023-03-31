const jwt = require('jsonwebtoken');


function generateToken(userId) {
  return jwt.sign({ userId }, process.env.SECRET);
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
