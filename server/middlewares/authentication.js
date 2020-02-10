const jwt = require('jsonwebtoken')
function authentication (req, res, next) {
  try {
    const access_token = req.headers.access_token
    const user = jwt.verify(access_token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (error) {
    next({code:401, message:"invalid token"})
  }
}

module.exports = authentication