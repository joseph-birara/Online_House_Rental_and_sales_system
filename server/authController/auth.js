const jwt = require("jsonwebtoken");

function extractToken(authHeader) {
  if (!authHeader || typeof authHeader !== "string") {
    return null;
  }
  return authHeader.replace(/^Bearer\s+\+?\s*/i, "").trim() || null;
}

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function verifyToken(token) {
  try {
    const raw = extractToken(token);
    if (!raw) {
      return null;
    }
    const decoded = jwt.verify(raw, process.env.SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken, extractToken };
