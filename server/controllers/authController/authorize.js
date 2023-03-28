const { verifyToken } = require('./auth');

async function getUser(req, res) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const userId = verifyToken(token);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  } 
  return userId
}


module.exports =  getUser ;
