const jwt = require('jsonwebtoken');
const { User } = require('../models');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    console.log('returning token')
    return authorization.replace('Bearer ', '')
  }
  console.log('returning null')
  return null
}

const authenticate = async (req, res, next) => {
  try {
    console.log("about to verify token")
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET)
    console.log('verified token')
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    console.log(decodedToken.id)
    req.user = await User.findByPk(decodedToken.id)
    next();
  } catch (error) {
    res.status(401).json({error: error.message});
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin !== true) return res.status(401).json({error: "User is not admin"})
  next();
}
module.exports = {authenticate, isAdmin};
